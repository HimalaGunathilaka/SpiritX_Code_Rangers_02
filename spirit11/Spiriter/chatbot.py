from flask import Flask, request, jsonify
import google.generativeai as genai  # or openai
from pymongo import MongoClient

app = Flask(__name__)

# Configure Gemini or GPT
genai.configure(api_key="AIzaSyAcZGFZDeSc_iyBbi0vXCdx6GIJV7oVk3U")
model = genai.GenerativeModel('gemini-pro')  # or 'gpt-3.5-turbo'

# Configure MongoDB Connection
def get_mongo_client():
    client = MongoClient("mongodb+srv://ashanuk:ashanuk@cluster0.1kstb.mongodb.net/")  # Replace with your MongoDB URI
    return client

@app.route('/chat', methods=['POST'])
def chat():
    data = request.get_json()
    user_input = data['message']

    # Generate MongoDB Query using LLM (very basic example, needs refinement)
    prompt = f"Generate a MongoDB find query (as a Python dictionary) to answer: '{user_input}'. Return only the dictionary."
    response = model.generate_content(prompt)
    try:
        mongo_query = eval(response.text.strip()) #CAUTION: eval() is dangerous. Refine this!
    except (SyntaxError, NameError, TypeError) as e:
        return jsonify({"response": f"Could not generate a valid MongoDB query: {e}"})

    # Execute MongoDB Query
    try:
        client = get_mongo_client()
        db = client["YOUR_DATABASE_NAME"]  # Replace with your database name
        collection = db["YOUR_COLLECTION_NAME"] # Replace with your collection name
        results = list(collection.find(mongo_query))
        client.close()
    except Exception as e:
        return jsonify({"response": f"Error querying MongoDB: {e}"})

    # Generate Response using LLM
    if results:
        prompt = f"Answer '{user_input}' using this data: {results}"
        response = model.generate_content(prompt)
        bot_response = response.text
    else:
        bot_response = "I couldn't find relevant information."

    print(bot_response)
    return jsonify({"response": bot_response})

if __name__ == '__main__':
    app.run(debug=True)