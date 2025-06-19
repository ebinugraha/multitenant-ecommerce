import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import { Category, Media, Product } from "@/payload-types";
import { z } from "zod";
import { Sort, Where } from "payload";
import { sortValues } from "../search-params";

export const productsRouter = createTRPCRouter({
  getMany: baseProcedure
    .input(
      z.object({
        cursor: z.number().default(1),
        limit: z.number().default(10),
        categories: z.string().nullable().optional(),
        minPrice: z.string().nullable().optional(),
        maxPrice: z.string().nullable().optional(),
        tags: z.array(z.string()).nullable().optional(),
        sort: z.enum(sortValues).nullable().optional(),
      })
    )
    .query(async ({ ctx, input }) => {
      const where: Where = {};
      let sort: Sort = "-createdAt";

      if (input.sort === "curated") {
        sort = "name";
      }

      if (input.sort === "newest") {
        sort = "+createdAt";
      }

      if (input.sort === "oldest") {
        sort = "-createdAt";
      }

      if (input.maxPrice && input.minPrice) {
        where.price = {
          less_than: input.maxPrice,
          greater_than: input.minPrice,
        };
      } else if (input.maxPrice) {
        where.price = {
          less_than_equal: input.maxPrice,
        };
      } else if (input.minPrice) {
        where.price = {
          greater_than_equal: input.minPrice,
        };
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

      if (input.tags && input.tags.length > 0) {
        where["tags.name"] = {
          in: input.tags,
        };
      }

      const data = await ctx.db.find({
        collection: "Products",
        depth: 1, //populate image and category
        where,
        sort,
        page: input.cursor,
        limit: input.limit
      });

      return {
        ...data,
        docs: data.docs.map((doc) => ({
          ...doc,
          image: doc.image as Media | null,
        })),
      };
    }),
});
