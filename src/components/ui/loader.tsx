import Image from "next/image";

export default function Loader() {
  return (
    <div className="h-full flex flex-col gap-y-4 items-center justify-center">
      <div className="w-20 h-20 relative animate-bounce">
        <Image alt="Loading" fill src="/logo.png" className=" rounded-3xl" />
      </div>
      <p className="text-sm text-muted-foreground">Genius is thinking</p>
    </div>
  );
}
