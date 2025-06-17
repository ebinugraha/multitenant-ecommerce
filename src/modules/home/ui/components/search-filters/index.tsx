"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import { Categories } from "./categories";
import { SearchInput } from "./search-input";
import { useTRPC } from "@/trpc/client";
import { Skeleton } from "@/components/ui/skeleton";
import { useParams } from "next/navigation";
import { cn } from "@/lib/utils";
import { BreadcrumbCategories } from "./breadcrumb-categories";

export const SearchFilters = () => {
  const trpc = useTRPC();
  const params = useParams();

  const { data } = useSuspenseQuery(trpc.categories.getMany.queryOptions());

  const categoriesParams = params.categories as string | undefined;
  const activeCategory = categoriesParams || "all";
  const activeCategories = data.find((item) => item.slug == activeCategory);
  const categoriesName = activeCategories?.name;

  const subCategoriesParams = params.subcategories as string | undefined;
  const activeSubCategoryName = activeCategories?.subcategories.find(
    (subcategories) => subcategories.slug == subCategoriesParams
  )?.name;

  const backgroundColor = activeCategories?.color || "#f5f5f5";

  return (
    <div
      className={cn("px-4 flex flex-col py-4 border-b gap-4")}
      style={{ backgroundColor }}
    >
      <SearchInput />
      <div className="hidden md:flex">
        <Categories data={data} />
      </div>
      <BreadcrumbCategories
        activeCategories={activeCategory}
        activeSubCategoryName={activeSubCategoryName}
        categoriesName={categoriesName}
      />
    </div>
  );
};

export const SearchFiltersSkeleton = () => {
  return (
    <div className="px-4 flex flex-col py-4 bg-[#f5f5f5] border-b gap-4">
      <SearchInput />
      <div className="hidden md:flex gap-4">
        {Array.from({ length: 6 }).map((_, index) => (
          <Skeleton key={index} className="h-11 w-52" />
        ))}
      </div>
    </div>
  );
};
