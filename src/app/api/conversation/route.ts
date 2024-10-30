import { auth } from "@clerk/nextjs/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";
const apiKey = process.env.API_KEY || "";
const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
import { increaseApiLimit, checkApiLimit } from "@/lib/api-limit";
import { checkSubscription } from "@/lib/subscription";
export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const body = await req.json();

    const { prompt } = body;
    // console.log(prompt);

    if (!userId) return new NextResponse("UNAUTHARISED", { status: 401 });
    if (!apiKey) return new NextResponse("API KEY NO", { status: 500 });
    if (!prompt) return new NextResponse("MESSAGE REQUIRED", { status: 400 });
    const freeTrial = await checkApiLimit();
    // console.log(freeTrial);
    const isPro = await checkSubscription();
    if (!freeTrial && !isPro)
      return new NextResponse("FreeTrial expirred", { status: 403 });
    const result = await model.generateContent(prompt);
    console.log(result.response.text());
    if (!isPro) await increaseApiLimit();

    return NextResponse.json(result.response.text());
  } catch (error) {
    console.log("CONVERSATION PAGE AAPI ", error);
    return new NextResponse("INTERNAL CONVO ERROR", { status: 500 });
  }
}
