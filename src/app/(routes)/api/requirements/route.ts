import fs from "fs";
import path from "path";
import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from '@google/generative-ai';

const filePath = path.join(process.cwd(), 'src/app/db.json');

export async function POST(req: NextRequest) {
  /* 
  Retrieves list of all exercises

  Route:
    /api/requirements POST

  Headers:
    None

  Body:
    {
      prompt: string
    }

  Returns:
    {
      requirements: string[]
      credits:      int
    }
    
  Status Codes:
    200 OK
    400 Bad Request (Out of Credits)
    500 Internal Server Error
  */
  // Get credits from database
  const data = fs.readFileSync(filePath, 'utf-8');
  const { credits } = JSON.parse(data);
  if (credits <= 0) return NextResponse.json({ error: "You've reached the maximum credit limit. Please purchase more credits to continue." }, { status: 400 });

  try {
    const key = "AIzaSyD0LK_Ug1ngEgrk1fE8BqQDtEzPCT7E0zk";

    // Prompt
    const initialPrompt = "Can you list these software requirements in bullet points without any other text, only use 1-5 words per requirement:"
    const { prompt } = await req.json();
    if (prompt === "") return NextResponse.json({ error: "Please enter a prompt" }, { status: 400 });
  
    // Get LLM response
    const genAI = new GoogleGenerativeAI(key);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const response = await model.generateContent(initialPrompt + prompt);

    // Parse text response into array
    const result = response.response.text();
    let filteredResult = result.split("\n");
    filteredResult = filteredResult.map((str: string) => str.slice(2));
    filteredResult = filteredResult.filter((str: string) => str !== "");

    // Decrement credits
    fs.writeFileSync(filePath, JSON.stringify({ credits: credits - 1 }, null, 2), 'utf-8');

    return NextResponse.json({ requirements: filteredResult, credits: credits - 1 }, { status: 200 });
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    return NextResponse.json({ error: "Failed to fetch response" }, { status: 500 });
  }
}