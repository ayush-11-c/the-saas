import Image from "next/image";

interface EmptyProps {
  lable: string;
}
export default function Empty({ lable }: EmptyProps) {
  return (
    <div className="h-full p-20 flex flex-col items-center">
      <div className="relative h-72 w-72">
        <Image alt="Empty" fill src="/empty.png" className="rounded-3xl" />
      </div>
      <p className="text-muted-foreground text-lg text-center my-4 underline">
        {lable}
      </p>
    </div>
  );
}
