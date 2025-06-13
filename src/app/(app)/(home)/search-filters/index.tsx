"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import { Categories } from "./categories";
import { SearchInput } from "./search-input";
import { useTRPC } from "@/trpc/client";
import { Skeleton } from "@/components/ui/skeleton";

export const SearchFilters = () => {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(trpc.categories.getMany.queryOptions());

  return (
    <div className="px-4 flex flex-col py-4 bg-[#f5f5f5] border-b gap-4">
      <SearchInput />
      <div className="hidden md:flex">
        <Categories data={data} />
      </div>
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
