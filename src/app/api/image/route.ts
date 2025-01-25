import { checkApiLimit, increaseApiLimit } from "@/lib/api-limit";
import { checkSubscription } from "@/lib/subscription";
import { auth } from "@clerk/nextjs/server";
import axios from "axios";

import { NextResponse } from "next/server";

const apiKey = process.env.HUGGING_FACE || "";

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { prompt } = body;
    const data = { inputs: prompt };
    const dataString = JSON.stringify(data);
    console.log(dataString);

    if (!userId) return new NextResponse("UNAUTHARISED", { status: 401 });
    if (!apiKey) return new NextResponse("API KEY NO", { status: 500 });
    const response = await fetch(
      "https://api-inference.huggingface.co/models/black-forest-labs/FLUX.1-dev",
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(dataString),
      }
    );

    console.log("cahturvedi");
    const result = await response.blob();
    const url = URL.createObjectURL(result);
    console.log("cahturvedi");
    const freeTrial = checkApiLimit();
    const isPro = checkSubscription();
    if (!isPro) await increaseApiLimit();
    if (!freeTrial && !isPro)
      return new NextResponse("Free trial expired", { status: 403 });
    try {
      return new NextResponse(result, { status: 200 });
    } catch (error) {
      console.error(error);
    }
  } catch (error) {
    console.log("CONVERSATION PAGE AAPI ", error);
    return new NextResponse("INTERNAL CONVO ERROR", { status: 500 });
  }
}
