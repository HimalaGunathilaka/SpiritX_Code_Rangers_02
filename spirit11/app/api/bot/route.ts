import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
  const GENERATIVE_API_KEY = process.env.GEMINI_API_KEY;
  const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GENERATIVE_API_KEY}`;

  if (!GENERATIVE_API_KEY) {
    throw new Error("GENERATIVE_API_KEY is not defined in the environment variables");
  }

  const requestBody = {
    contents: [{
      parts: [{ text: (await request.json()).text }]
    }]
  };

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    const data = await response.json();
    console.log(data.candidates[0].parts[0].text);
    return new NextResponse(JSON.stringify(data), { status: 200 });
  } catch (error: any) {
    return new NextResponse("Failed to fetch data from the API: " + error.message, {
      status: 500,
    });
  }
};