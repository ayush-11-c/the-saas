import { Code, ImageIcon, MessageSquare, Music, VideoIcon } from "lucide-react";
export const MAX_FREE_COUNT = 3;
export const tools = [
  {
    lable: "Conversation",
    icon: MessageSquare,
    color: "text-violet-500",
    bgColor: "bg-violet-500/10",
    href: "/conversation",
  },

  {
    lable: "Image Generation",
    icon: ImageIcon,
    href: "/image",
    color: "text-pink-700",
    bgColor: "bg-pink-700/10",
  },

  {
    lable: "Code Generation",
    icon: Code,
    href: "/code",
    color: "text-green-700",
    bgColor: "bg-green-700/10",
  },
];
