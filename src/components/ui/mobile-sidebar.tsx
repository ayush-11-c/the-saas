"use client";
import { Button } from "./button";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "./sheet";
import Sidebar from "./sidebar";
import { useEffect, useState } from "react";
interface mobileProp {
  apiLimit: number;
  isPro: boolean;
}
export default function MobileSidebar({ apiLimit, isPro = false }: mobileProp) {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);
  return (
    <Sheet>
      <SheetTrigger>
        <Button variant="ghost" size="icon" className="bg-amber-400 md:hidden ">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="p-0">
        <Sidebar apiLimit={apiLimit} isPro={isPro} />
      </SheetContent>
    </Sheet>
  );
}
