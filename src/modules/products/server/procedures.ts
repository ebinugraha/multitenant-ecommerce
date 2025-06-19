import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import { Category, Product } from "@/payload-types";
import { z } from "zod";
import { Where } from "payload";
import { equal } from "assert";

export const productsRouter = createTRPCRouter({
  getMany: baseProcedure
    .input(
      z.object({
        categories: z.string().nullable().optional(),
        minPrice: z.number().nullable().optional(),
        maxPrice: z.number().nullable().optional()
      })
    )
    .query(async ({ ctx, input }) => {
      const where: Where = {};

      if(input.maxPrice){
        where.price = {
          less_than_equal: input.maxPrice
        }
      }
      
      if(input.minPrice){
        where.price = {
          greater_than_equal: input.minPrice
        }
      }

      if (input.categories) {
        const categoriesData = await ctx.db.find({
          collection: "categories",
          limit: 1,
          pagination: false,
          where: {
            slug: {
              equals: input.categories,
            },
          },
        });

        const formattedData = categoriesData.docs.map((doc) => ({
          ...doc,
          subcategories: (doc.subcategories?.docs ?? []).map((sub) => ({
            ...(sub as Category),
            subcategories: undefined,
          })),
        }));

        const parentCategories = formattedData[0];

        const subCategoriesSlug = [];

        if (parentCategories) {
          subCategoriesSlug.push(
            ...parentCategories.subcategories.map((sub) => sub.slug)
          );
          where["category.slug"] = {
            in: [parentCategories.slug, ...subCategoriesSlug],
          };
        }

        // mencari kecocokan category.slug
      }

      const data = await ctx.db.find({
        collection: "Products",
        sort: "name",
        depth: 1, //populate image and category
        where,
      });

      return data;
    }),
});
