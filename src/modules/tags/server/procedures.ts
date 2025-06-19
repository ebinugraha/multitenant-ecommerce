import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import { Category, Product } from "@/payload-types";
import { z } from "zod";
import { Where } from "payload";

export const tagsRouter = createTRPCRouter({
  getMany: baseProcedure
    .input(
      z.object({
        cursor: z.number().default(1),
        limit: z.number().default(10),
      })
    )
    .query(async ({ ctx, input }) => {
      const data = await ctx.db.find({
        collection: "tags",
        limit: input.limit,
        page: input.cursor,
      });

      return data;
    }),
});
