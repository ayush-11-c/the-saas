"use client";

import * as z from "zod";
import Heading from "@/components/ui/heading";
import axios from "axios";
import { Download, ImageIcon } from "lucide-react";
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

import Image from "next/image";
import { Card, CardFooter } from "@/components/ui/card";
import { useProModel } from "@/hooks/use-pro-model";
let c = 0;
export default function ImagePage() {
  const router = useRouter();
  const proModel = useProModel();
  const [images, setImages] = useState("");
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  });
  const isLoading = form.formState.isSubmitting;
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setImages("");
      const response = await axios.post("/api/image", values, {
        responseType: "blob",
      });

      console.log(response.data);

      const url = URL.createObjectURL(response.data);
      console.log(url);
      setImages(url);
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
        title="Image"
        description="Convert text to image"
        icon={ImageIcon}
        iconColor="text-pink-700"
        bgColor="bg-pink-700/10"
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
                  <FormItem className="col-span-12 lg:col-span-6">
                    <FormControl className="m-0 p-0">
                      <Input
                        className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                        disabled={isLoading}
                        placeholder="Generate image from text"
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
            <div className="p-20 ">
              <Loader />
            </div>
          )}
          {images.length === 0 && !isLoading ? (
            <Empty lable="No image yet" />
          ) : (
            <div className="flex justify-center md: gap-4 mt-8">
              <Card className="rounded-lg overflow-hidden">
                <div className="relative aspect-square">
                  <Image alt={"image"} src={images} width={512} height={512} />
                </div>
                <CardFooter className="p-2">
                  <Button
                    variant="secondary"
                    className="w-full"
                    onClick={() => window.open(images, "_blank")}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </CardFooter>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
