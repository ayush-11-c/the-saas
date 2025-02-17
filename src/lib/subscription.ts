import { auth } from "@clerk/nextjs/server";
import prismadb from "./prismadb";

const DAY_IN_MS = 86_400_000;
export const checkSubscription = async () => {
  const { userId } = auth();
  if (!userId) return false;
  const userSubscription = await prismadb.userSubscription.findUnique({
    where: {
      userId: userId,
    },
    select: {
      endDate: true,
      razorpay_order_id: true,
      razorpay_payment_id: true,
    },
  });
  if (!userSubscription) return false;
  const isValid = userSubscription.endDate?.getTime() + DAY_IN_MS > Date.now();
  return !!isValid;
};
