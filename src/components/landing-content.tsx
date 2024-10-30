"use client";

import { title } from "process";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

const testimonial = [
  { name: "Ayush", avatar: "A", desc: "WonderFull", title: "WebDevloper" },
  { name: "Shail", avatar: "S", desc: "Amazing", title: "WebDevloper" },
  { name: "Aryan ", avatar: "AC", desc: "Cool", title: "WebDevloper" },
  { name: "Kaif", avatar: "K", desc: "Nice", title: "WebDevloper" },
];

export const LandingContent = () => {
  return (
    <div className="px-5 sm:px-10 pb-20 bg-gray-900">
      <h2 className="text-center text-4xl text-white font-extrabold mb-12">
        Testimonials
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {testimonial.map((item) => (
          <Card
            key={item.desc}
            className="bg-[#1e2947] rounded-lg border-none text-white p-6 transition-shadow hover:shadow-lg"
          >
            <CardHeader className="space-y-4">
              <CardTitle className="flex items-center gap-x-4">
                <div>
                  <p className="text-xl font-semibold text-white">
                    {item.name}
                  </p>
                  <p className="text-sm text-zinc-400">{item.title}</p>
                </div>
              </CardTitle>
              <CardContent className="text-base leading-relaxed text-zinc-300">
                {item.desc}
              </CardContent>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
};
