import Razorpay from "razorpay";
import crypto from "crypto";
import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";
import { HMAC } from "fast-sha256";
const instance = new Razorpay({
  key_id: process.env.RAZOR_API_KEY || "",
  key_secret: process.env.RAZOR_API_SECRET,
});
function generateHmac(
  order_id: string,
  razorpay_payment_id: string,
  secret: string
): string {
  const message = `${order_id}|${razorpay_payment_id}`;
  return crypto.createHmac("sha256", secret).update(message).digest("hex");
}

export async function POST(req: Request, res: Response) {
  const body = await req.json();

  const { userId, razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    body;
  const cd = new Date();
  const fd = new Date(cd);
  fd.setDate(cd.getDate() + 30);
  console.log(userId);

  const expectedSignature = generateHmac(
    razorpay_order_id,
    razorpay_payment_id,
    process.env.RAZOR_API_SECRET || ""
  );

  const isAuthentic = expectedSignature === razorpay_signature;
  if (isAuthentic) {
    await prismadb.userSubscription.create({
      data: {
        userId: userId,
        razorpay_order_id: razorpay_order_id,
        razorpay_payment_id: razorpay_payment_id,
        razorpay_signature: razorpay_signature,
        endDate: fd,
      } as any,
    });
    return NextResponse.json({ message: "success" }, { status: 200 });
  } else {
    return NextResponse.json(
      {
        message: "fail",
      },
      {
        status: 400,
      }
    );
  }
}
