import fs from "fs";
import path from "path";
import { NextRequest, NextResponse } from "next/server";

const filePath = path.join(process.cwd(), 'src/app/db.json');

export async function GET(req: NextRequest) {
  /*
  Retrieves number of credits remaining

  Route:
    /api/credits GET

  Headers:
    None
  
  Returns:
    {
      credits: int
    }
  
    Status Codes:
      200 OK
      500 Internal Server Error
  */
  // Get credits from database
  const data = fs.readFileSync(filePath, 'utf-8');
  const { credits } = JSON.parse(data);

  return NextResponse.json({ credits: credits }, { status: 200 });
}

export async function POST(req: NextRequest) {
  /*
  Adds credits

  Route:
    /api/credits POST
  
  Headers:
    None
  
  Body:
    {
      additionalCredits: int
    }

  Returns:
    {
      credits: int
    }
  
    Status Codes:
      200 OK
      500 Internal Server Error
  */
  // Get credits from database
  const data = fs.readFileSync(filePath, 'utf-8');
  const { credits } = JSON.parse(data);
  const { additionalCredits } = await req.json();
  
  // Add credits
  fs.writeFileSync(filePath, JSON.stringify({ credits: credits + additionalCredits }, null, 2), 'utf-8');
  
  return NextResponse.json({ credits: credits + additionalCredits }, { status: 200 });
}