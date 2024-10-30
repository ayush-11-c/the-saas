import prismadb from "@/lib/prismadb";
import { absoluteUrl } from "@/lib/utils";
import { auth, currentUser } from "@clerk/nextjs/server";
import { url } from "inspector";
import { NextResponse } from "next/server";
import Razorpay from "razorpay";
import { v4 as uuidv4 } from "uuid";
const settingsUrl = absoluteUrl("/settings");
const instance = new Razorpay({
  key_id: process.env.RAZOR_API_KEY!,
  key_secret: process.env.RAZOR_API_SECRET,
});

export async function GET() {
  try {
    const { userId } = auth();
    const user = await currentUser();
    if (!userId || !user)
      return new NextResponse("Unauthorize", { status: 401 });
    const UserSubscription = await prismadb.userSubscription.findUnique({
      where: { userId },
    });
    if (!UserSubscription) {
      const payment_capture = 1;
      const amount = 2 * 10000;
      const currency = "INR";
      const options = {
        amount: amount.toString(),
        currency,
        receipt: uuidv4(),
        payment_capture,
        notes: {
          paymentFor: "GENIUS",
          userId: userId,
        },
      };

      const order = await instance.orders.create(options);

      return NextResponse.json({ msg: "success", order });
    }
  } catch (error) {
    console.log("{RAZOR ERROR}", error);
    return new NextResponse("INTERNAL RAZOR ERROR", { status: 500 });
  }
}
export async function POST(req: Request) {
  const body = await req.json();

  return NextResponse.json({ msg: body });
}
