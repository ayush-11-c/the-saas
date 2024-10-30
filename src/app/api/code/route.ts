import { checkApiLimit, increaseApiLimit } from "@/lib/api-limit";
import { checkSubscription } from "@/lib/subscription";
import { auth } from "@clerk/nextjs/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";
const apiKey = process.env.API_KEY || "";
const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  tools: [
    {
      codeExecution: {},
    },
  ],
});

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const body = await req.json();
    // console.log(req.json());

    const { prompt } = body;

    if (!userId) return new NextResponse("UNAUTHARISED", { status: 401 });
    if (!apiKey) return new NextResponse("API KEY NO", { status: 500 });
    if (!prompt) return new NextResponse("MESSAGE REQUIRED", { status: 400 });
    const freeTrial = checkApiLimit();
    const isPro = checkSubscription();
    if (!freeTrial && !isPro)
      return new NextResponse("free trialover", { status: 403 });
    const result = await model.generateContent(
      prompt + "Generate and run code "
    );
    if (!isPro) await increaseApiLimit();
    return NextResponse.json(result.response.text());
  } catch (error) {
    console.log("CONVERSATION PAGE API ", error);
    return new NextResponse("INTERNAL CONVO ERROR", { status: 500 });
  }
}
