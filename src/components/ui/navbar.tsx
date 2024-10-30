import { UserButton } from "@clerk/nextjs";
import MobileSidebar from "./mobile-sidebar";
import { getApiCount } from "@/lib/api-limit";
import { checkSubscription } from "@/lib/subscription";
const Navbar = async () => {
  const apiLimit = await getApiCount();
  const isPro = await checkSubscription();
  return (
    <div className=" flex items-center p-4 ">
      <MobileSidebar apiLimit={apiLimit} isPro={isPro} />
      <div className="flex  justify-end">
        <UserButton />
      </div>
    </div>
  );
};
export default Navbar;
