import Heading from "@/components/ui/heading";
import { SubscriptionButton } from "@/components/ui/subscription-button";
import { checkSubscription } from "@/lib/subscription";
import { Settings } from "lucide-react";
import { boolean } from "zod";

const SettingsPage = async () => {
  const isPro = await checkSubscription();
  return (
    <div>
      <Heading
        title="Settings"
        description="Mannage Account"
        icon={Settings}
        iconColor="text-gray-700"
        bgColor="bg-gray-700/10"
      />
      <div className="px-4 lg:px-8 space-y-4">
        <div className="text-muted-foreground text-sm">
          {isPro ? "YOU ARE PRO USER" : "YOU ARE ON FREE PLAN"}
        </div>
        <SubscriptionButton isPro={isPro} />
      </div>
      <div className=""></div>
    </div>
  );
};
export default SettingsPage;
