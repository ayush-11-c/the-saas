"use client";
import { useEffect, useState } from "react";
import { Card, CardContent } from "./card";
import { MAX_FREE_COUNT } from "../../../constant";
import { Progress } from "./progress";
import { Button } from "./button";
import { Zap } from "lucide-react";
import { useProModel } from "@/hooks/use-pro-model";

interface FreeCounterprop {
  apiLimit: number;
  isPro: boolean;
}
export const FreeCounter = ({
  apiLimit = 0,
  isPro = false,
}: FreeCounterprop) => {
  const [mounted, settMounted] = useState(false);
  useEffect(() => {
    settMounted(true);
  }, []);
  const proModel = useProModel();
  if (!mounted) return null;
  if (isPro) return null;
  return (
    <div className="px-3">
      <Card className="bg-white/10 border-0">
        <CardContent className="py-6">
          <div className="text-center text-sm text-white mb-4 space-y-4">
            <p>
              {apiLimit}/{MAX_FREE_COUNT} FREE GENERATION
            </p>
            <Progress
              className="h-3"
              value={(apiLimit / MAX_FREE_COUNT) * 100}
            />
          </div>
          <Button
            onClick={proModel.onOpen}
            className="w-full"
            variant="premium"
          >
            Upgrade
            <Zap className="w-4 h-4 ml-2 fill-white" />
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
