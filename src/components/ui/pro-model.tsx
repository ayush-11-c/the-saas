"use client";

import { useProModel } from "@/hooks/use-pro-model";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./dialog";

import { Badge } from "./badge";
import { tools } from "../../../constant";
import { Card } from "./card";
import { cn } from "@/lib/utils";
import { Check, Currency, Zap } from "lucide-react";
import { Button } from "./button";
import { useRouter } from "next/navigation";

// Declare Razorpay on the window object

import { useState } from "react";

export const ProModel = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const proModal = useProModel();
  const makePayment = async ({ productId = null }) => {
    const key = process.env.RAZORPAY_API_KEY || "";
    const data = await fetch("http://localhost:3000/api/razorpay");

    const { order } = await data.json();
    console.log(order);
    const options = {
      key_id: key,
      name: "GENIUS",
      currency: order.currency,
      amount: order.amount,
      order_id: order.id,
      description: "Payment",
      handler: async function (response: {
        razorpay_payment_id: any;
        razorpay_order_id: any;
        razorpay_signature: any;
      }) {
        const data = await fetch("http://localhost:3000/api/webhook", {
          method: "POST",
          body: JSON.stringify({
            userId: order.notes.userId,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_order_id: response.razorpay_order_id,
            razorpay_signature: response.razorpay_signature,
          }),
        });
        const res = await data.json();
        if (res?.message === "success") {
          router.push("/settings");
        }
      },
      prefill: {
        name: "GENIUS",
        email: "ac833391@gmail.com",
        contact: "8429688187",
      },
    };
    console.log(options);
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
    paymentObject.on("payment.failed", () => {
      alert("Payment failed. Please try again. Contact support for help");
    });
  };
  return (
    <div>
      <Dialog open={proModal.isOpen} onOpenChange={proModal.onClose}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex justify-center items-center flex-col gap-y-4 pb-2">
              <div className="flex items-center gap-x-2 font-bold py-1 ">
                Upgrade To Pro
                <Badge className="uppercase text-sm py-1" variant="premium">
                  Pro
                </Badge>
              </div>
            </DialogTitle>
            <DialogDescription className="text-center pt-2 space-y-2 text-zinc-900 font-medium">
              {tools.map((tool) => (
                <Card
                  key={tool.href}
                  className="p-3 border-black/5 flex items-center justify-between"
                >
                  <div className=" flex items-center gap-x-4">
                    <div className={cn("p-2 w-fit rounded-md", tool.bgColor)}>
                      <tool.icon className={cn("w-6 h-6", tool.color)} />
                    </div>
                    <div className="font-semibold text-sm"> {tool.lable}</div>
                  </div>
                  <Check className="text-primary w-5 h-5" />
                </Card>
              ))}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              disabled={loading}
              onClick={makePayment as any}
              size="lg"
              variant="premium"
              className="w-full"
            >
              Upgrade
              <Zap className="w-4 h-4 ml-2 fill-white" />
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
