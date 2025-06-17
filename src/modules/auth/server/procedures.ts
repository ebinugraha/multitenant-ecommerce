import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import { TRPCError } from "@trpc/server";
import { headers as getHeaders, cookies as getCookies } from "next/headers";
import { z } from "zod";
import { loginSchemas, registerSchemas } from "../schemas/schemas";
import { cookieGenerator, cookieRemover } from "../utils";

export const authRouter = createTRPCRouter({
  logout: baseProcedure.query(async ({ ctx }) => {
    await cookieRemover(ctx.db.config.cookiePrefix);
  }),

  session: baseProcedure.query(async ({ ctx }) => {
    const headers = await getHeaders();
    const session = await ctx.db.auth({ headers });
    return session;
  }),

  register: baseProcedure
    .input(registerSchemas)
    .mutation(async ({ input, ctx }) => {
      const isUsernameExist = await ctx.db.find({
        collection: "users",
        limit: 1,
        where: {
          username: {
            equals: input.username,
          },
        },
      });

      const existingData = isUsernameExist.docs[0];
      if (existingData) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Username already exist",
        });
      }

      await ctx.db.create({
        collection: "users",
        data: {
          email: input.email,
          password: input.password,
          username: input.username,
        },
      });

      const data = await ctx.db.login({
        collection: "users",
        data: {
          email: input.email,
          password: input.password,
        },
      });

      if (!data.token) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Invalid email or password",
        });
      }

      cookieGenerator({
        prefix: ctx.db.config.cookiePrefix,
        value: data.token,
      });

      return data;
    }),

  login: baseProcedure.input(loginSchemas).mutation(async ({ input, ctx }) => {
    const data = await ctx.db.login({
      collection: "users",
      data: {
        email: input.email,
        password: input.password,
      },
    });

    if (!data.token) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "Invalid email or password",
      });
    }

    await cookieGenerator({
      prefix: ctx.db.config.cookiePrefix,
      value: data.token,
    });

    return data;
  }),
});
