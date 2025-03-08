const { MongoClient } = require("mongodb");
const dotenv = require("dotenv");
const axios = require("axios");
dotenv.config({ path: "../.env" });

const uri = process.env.MONGO_URI;
const hf_token = process.env.HF_TOKEN;
const embedding_url = process.env.EMBEDDING_URL;

//console.log("uri", uri);

// Check if MongoDB URI is available
if (!uri) {
  console.error("MongoDB URI is not defined in .env file");
  process.exit(1);
}

// Connect to MongoDB
async function connectToMongoDB() {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log("Successfully connected to MongoDB");

    // Example: List all databases
    const databasesList = await client.db().admin().listDatabases();
    console.log("Databases:");
    databasesList.databases.forEach((db) => console.log(` - ${db.name}`));
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  } finally {
    await client.close();
    console.log("MongoDB connection closed");
  }
}

//connectToMongoDB();

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

    const db = client.db("spiritx");
    const collection = db.collection("players");
    const result = await collection.find({}).toArray();
    console.log(result);

    for (const player of result) {
      const embedResult = await embedding(player.name);
      await collection.updateOne(
        { _id: player._id },
        { $set: { embedding: embedResult } }
      );
      console.log(`Updated ${player.name} with embedding`);
    }
  } catch (error) {
    console.error("Error:", error);
  } finally {
    console.log("MongoDB connection closed");
    await client.close();
  }
}

///save_embeddings();

async function query_embeddings() {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log("Successfully connected to MongoDB");

    const db = client.db("spiritx");
    const collection = db.collection("players");

    const query = "who's name is ?";
    const queryEmbedding = await embedding(query);

    const results = await collection
      .aggregate([
        {
          $vectorSearch: {
            index: "playernameIndex",
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

    console.log("Search Results:", JSON.stringify(results, null, 2));
  } catch (error) {
    console.error("Error:", error);
  } finally {
    await client.close();
    console.log("MongoDB connection closed");
  }
}

query_embeddings();
