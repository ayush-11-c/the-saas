"use client";

import { Zap } from "lucide-react";
import { Button } from "./button";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface SubscriptionButtonProp {
  isPro: boolean;
}
export const SubscriptionButton = ({
  isPro = false,
}: SubscriptionButtonProp) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const onClick = async () => {
    try {
      if (!isPro) {
        setLoading(true);
        const response = await axios.get("/api/razorpay");
      } else router.push("/dashboard");
    } catch (error) {
      console.log("BILLING ERROR", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Button
      disabled={loading}
      variant={isPro ? "default" : "premium"}
      onClick={onClick}
    >
      {isPro ? "Go To Dashboard" : "Upgrage"}
      {!isPro && <Zap className="w-4 h-4 ml-2 fill-white" />}
    </Button>
  );
};
