import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";

export async function GET() {
  const { data, error } = await supabase
    .from('todos')
    .select('*')
    .order('created_at', { ascending: false });
    
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  
  return NextResponse.json(data);
}

export async function POST(req: Request) {
  try {
    const { title } = await req.json();
    if (!title) {
      return NextResponse.json({ error: "Title is required" }, { status: 400 });
    }

    const llm = new ChatGoogleGenerativeAI({
      model: "gemini-3.1-flash-lite-preview",
      apiKey: process.env.GEMINI_API_KEY,
    });

    const response = await llm.invoke([
      ["system", "You are an AI that categorizes the difficulty of a to-do task. You must respond with EXACTLY one of the following words: EASY, MEDIUM, or HARD. Do not include any other text or explanation."],
      ["human", `Task: ${title}`]
    ]);

    const difficultyText = response.content.toString().trim().toUpperCase();
    let difficulty = "MEDIUM";
    if (["EASY", "MEDIUM", "HARD"].includes(difficultyText)) {
      difficulty = difficultyText;
    }

    const { data, error } = await supabase
      .from('todos')
      .insert([{ title, difficulty, completed: false }])
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json(data);
  } catch (error: any) {
    console.error("Error creating todo:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
