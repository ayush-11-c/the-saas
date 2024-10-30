"use client";

import * as z from "zod";
import Heading from "@/components/ui/heading";
import axios from "axios";
import { Code, Proportions } from "lucide-react";
import { useForm } from "react-hook-form";
import { formSchema } from "./constant";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField, FormItem, FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Empty from "@/components/ui/empty";
import Loader from "@/components/ui/loader";
import { cn } from "@/lib/utils";
import { UserAvatar } from "@/components/ui/user-avatar";
import { Botavatar } from "@/components/ui/bot-avatar";
import ReactMarkdown from "react-markdown";
import { useProModel } from "@/hooks/use-pro-model";
let c = 0;
export default function CodePage() {
  const proModel = useProModel();
  const router = useRouter();
  const [messages, setMessages] = useState([] as any[]);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  });

  const isLoading = form.formState.isSubmitting;
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!values.prompt) return;

    try {
      const userMessage = {
        role: "user",
        prompt: values.prompt,
      };
      const newMessage = [userMessage, ...messages];

      const response = await axios.post(
        "/api/code",
        newMessage[0]

        //yahabhejna hai
      );

      if (response.data) {
        setMessages([...messages, userMessage, { res: response.data }]);
      }
      setMessages([...messages, userMessage, { res: response.data }]);

      form.reset();
    } catch (error: any) {
      if (error?.response?.status === 203) proModel.onOpen();
    } finally {
      // console.log(values);

      router.refresh();
    }
  };
  return (
    <div>
      <Heading
        title="Code Generation"
        description="Our Code Generation model"
        icon={Code}
        iconColor="text-green-700"
        bgColor="bg-green-700/10"
      />
      <div className="px-4 lg:px-8">
        <div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2 "
            >
              <FormField
                name="prompt"
                render={({ field }) => (
                  <FormItem className="col-span-12 lg:col-span-10">
                    <FormControl className="m-0 p-0">
                      <Input
                        className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                        disabled={isLoading}
                        placeholder="How to Generate form in react"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button
                className="col-span-12 lg:col-span-2 w-full"
                disabled={isLoading}
              >
                Generate
              </Button>
            </form>
          </Form>
        </div>
        <div className="space-y-4 mt-4">
          {isLoading && (
            <div className="p-8 rounded-lg w-full flex items-center justify-center bg-muted">
              <Loader />
            </div>
          )}
          {messages.length === 0 && !isLoading && (
            <Empty lable="No conversation yet" />
          )}
          <div className="flex flex-col-reverse gap-4">
            {messages.map((message) => (
              <div
                key={c++}
                className={cn(
                  "p-8 w-full flex items-start gap-x-8 rounded-lg",
                  message.role === "user"
                    ? "bg-white border border-black/10"
                    : "bg-muted"
                )}
              >
                {message.role === "user" ? <UserAvatar /> : <Botavatar />}
                <ReactMarkdown className={"overflow-hidden"}>
                  {message.res}
                </ReactMarkdown>
                {message.prompt}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
