"use client";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { registerSchemas } from "../../schemas/schemas";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useTRPC } from "@/trpc/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const SignUpView = () => {
  const router = useRouter();

  const trpc = useTRPC();
  const queryClient = useQueryClient();

  const register = useMutation(
    trpc.auth.register.mutationOptions({
      onError: (error) => {
        toast.error(error.message);
      },
      onSuccess: async () => {
        await queryClient.invalidateQueries(trpc.auth.session.queryFilter());
        router.push("/");
      },
    })
  );

  const form = useForm<z.infer<typeof registerSchemas>>({
    mode: "all",
    resolver: zodResolver(registerSchemas),
    defaultValues: {
      email: "",
      password: "",
      username: "",
    },
  });

  const onSubmit = (data: z.infer<typeof registerSchemas>) => {
    register.mutate(data);
  };

  const username = form.watch("username");
  const usernameError = form.formState.errors.username;
  const descView = username && !usernameError;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5">
      <div className="bg-[#f4f4f0] h-screen w-full lg:col-span-3 overflow-y-auto">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-6 p-4 lg:p-16"
          >
            <div className="flex items-center justify-between mb-8">
              <Link
                href={"/"}
                className={cn("font-semibold text-3xl", poppins.className)}
              >
                Nugraha Store
              </Link>
              <Button
                variant={"ghost"}
                className="border-none underline"
                asChild
              >
                <Link href={"/sign-in"} prefetch>
                  Sign In
                  <ArrowRight />
                </Link>
              </Button>
            </div>
            <div className="flex flex-col gap-4 w-full rounded-md ring-1 p-4 bg-[#f4f4f4]">
              <h1 className="text-3xl font-medium">
                Join over 1000 on Nugraha store
              </h1>

              <FormField
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormDescription
                      className={cn("hidden", descView && "block")}
                    >
                      your store {username}
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input {...field} type="password" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                className="bg-black hover:bg-pink-400 text-white hover:text-primary"
                variant={"elevated"}
                disabled={register.isPending}
              >
                Create an account
              </Button>
            </div>
          </form>
        </Form>
      </div>
      <div
        className="h-screen w-full lg:col-span-2 hidden lg:block"
        style={{
          backgroundImage: "url('/auth-background.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        background
      </div>
    </div>
  );
};
