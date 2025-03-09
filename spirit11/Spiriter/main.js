const { MongoClient } = require("mongodb");
const dotenv = require("dotenv");
const axios = require("axios");
const path = require("path");
const fs = require("fs");
const readline = require("readline");

// Use absolute path to find the .env file
const envPath = path.resolve(__dirname, "../.env");

// Check if .env file exists
if (!fs.existsSync(envPath)) {
  console.error(`ERROR: .env file not found at ${envPath}`);
  process.exit(1);
}

// Load environment variables with absolute path
dotenv.config({ path: envPath });

// Debug env variables
console.log("Environment variables loaded from:", envPath);
console.log("Environment variables:");
console.log("MONGO_URI:", process.env.MONGO_URI);
console.log("EMBEDDING_URL:", process.env.EMBEDDING_URL);
console.log(
  "GEMINI_API_KEY:",
  process.env.GEMINI_API_KEY ? "[REDACTED]" : "undefined"
);

const uri = process.env.MONGO_URI;
//const hf_token = process.env.HF_TOKEN;
const embedding_url = process.env.EMBEDDING_URL;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
//const GEMINI_EMBEDDING_URL = "https://generativelanguage.googleapis.com/v1beta/models/embedding-001:predict";
const GEMINI_EMBEDDING_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/embedding-001:embedContent";
// Check if MongoDB URI is available
if (!uri) {
  console.error("mongo uri", uri);
  console.log(embedding_url);
  console.error("MongoDB URI is not defined in .env file");
  process.exit(1);
}

function generatePlayerDescription(player) {
  return `${player.name} from ${player.university} is a ${player.category}. 
    He has scored ${player.totalruns} runs in ${player.inningsplayed} innings, 
    facing ${player.ballsfaced} balls. 
    He has taken ${player.wickets} wickets in ${player.overbowled} overs, 
    conceding ${player.runsconceded} runs.`;
}

async function embeddingWithGemini(text) {
  try {
    const response = await axios.post(
      `${GEMINI_EMBEDDING_URL}?key=${GEMINI_API_KEY}`,
      {
        model: "embedding-001",
        content: { parts: [{ text: text }] },
        taskType: "RETRIEVAL_DOCUMENT",
      },
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    if (response.data && response.data.embedding) {
      return response.data.embedding.values;
    } else {
      throw new Error("No embedding found in response.");
    }
  } catch (error) {
    console.error("Error fetching Gemini embedding:", error.message);
    if (error.response) {
      console.error("Error details:", error.response.data);
    }
    throw error;
  }
}

const embedding = async (text) => {
  try {
    const response = await axios.post(
      embedding_url,
      { inputs: text },
      {
        headers: {
          Authorization: `Bearer ${hf_token}`,
          "Content-Type": "application/json",
        },
      }
    );
    //console.log("Embedding successful:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error embedding:", error.message);
    if (error.response) {
      console.error("Error details:", error.response.data);
    }
    throw error; // Re-throw to handle in calling function
  }
};

//embedding("Hello, world!");

async function save_embeddings() {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log("Successfully connected to MongoDB");

    const db = client.db("test");
    const collection = db.collection("players");
    const result = await collection.find({}).toArray();
    //console.log(result);

    for (const player of result) {
      const embedResult = await embeddingWithGemini(
        generatePlayerDescription(player)
      );
      await collection.updateOne(
        { _id: player._id },
        { $set: { embedding: embedResult } }
      );
      console.log(`Updated ${player.name} with embedding`);
    }

    // const embedResult = await embeddingWithGemini(
    //   generatePlayerDescription(result[0])
    // );
    // await collection.updateOne(
    //   { _id: result[0]._id },
    //   { $set: { embedding: embedResult } }
    // );
    // console.log(`Updated ${result[0].name} with embedding`);
  } catch (error) {
    console.error("Error:", error);
  } finally {
    console.log("MongoDB connection closed");
    await client.close();
  }
}

//save_embeddings();

// Function to query embeddings based on user input
async function query_embeddings(query) {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log("Successfully connected to MongoDB");

    const db = client.db("test");
    const collection = db.collection("players");

    const queryEmbedding = await embeddingWithGemini(query);

    const results = await collection
      .aggregate([
        {
          $vectorSearch: {
            index: "vector_index",
            path: "embedding",
            queryVector: queryEmbedding,
            numCandidates: 100,
            limit: 10,
          },
        },
        {
          $project: {
            name: 1,
            rating: 1,
            score: { $meta: "vectorSearchScore" },
            _id: 0,
          },
        },
      ])
      .toArray();

    if (results.length === 0) {
      return "I don't have enough knowledge to answer that question.";
    }
    console.log("Search Results:", JSON.stringify(results, null, 2));
    return results;
  } catch (error) {
    console.error("Error:", error);
  } finally {
    await client.close();
    console.log("MongoDB connection closed");
  }
}

// Create readline interface for user input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Prompt user for a query
rl.question("Please enter your query: ", async (query) => {
  await query_embeddings(query);
  rl.close(); // Close the readline interface
});
