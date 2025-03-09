import google.generativeai as genai
from pymongo import MongoClient

# Configure Gemini or GPT
genai.configure(api_key="AIzaSyAcZGFZDeSc_iyBbi0vXCdx6GIJV7oVk3U")
model = genai.GenerativeModel('gpt-3.5-turbo')  # Use a supported model

# Configure MongoDB Connection
def get_mongo_client():
    client = MongoClient("mongodb+srv://ashanuk:ashanuk@cluster0.1kstb.mongodb.net/")  # Replace with your MongoDB URI
    return client

def chat_with_mongodb():
    while True:
        user_input = input("You: ")
        if user_input.lower() in ['exit', 'quit']:
            break

        # Generate MongoDB Query using LLM (very basic example, needs refinement)
        prompt = f"Generate a MongoDB find query (as a Python dictionary) to answer: '{user_input}'. Return only the dictionary."
        response = model.generate_content(prompt)
        try:
            mongo_query = eval(response.text.strip()) #CAUTION: eval() is dangerous. Refine this!
        except (SyntaxError, NameError, TypeError) as e:
            print(f"Bot: Could not generate a valid MongoDB query: {e}")
            continue

        # Execute MongoDB Query
        try:
            client = get_mongo_client()
            db = client["YOUR_DATABASE_NAME"]  # Replace with your database name
            collection = db["YOUR_COLLECTION_NAME"] # Replace with your collection name
            results = list(collection.find(mongo_query))
            client.close()
        except Exception as e:
            print(f"Bot: Error querying MongoDB: {e}")
            continue

        # Generate Response using LLM
        if results:
            prompt = f"Answer '{user_input}' using this data: {results}"
            response = model.generate_content(prompt)
            bot_response = response.text
        else:
            bot_response = "I couldn't find relevant information."

        print(f"Bot: {bot_response}")

if __name__ == "__main__":
    chat_with_mongodb()