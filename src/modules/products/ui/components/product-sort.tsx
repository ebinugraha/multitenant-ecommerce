"use client"

import { Button } from "@/components/ui/button";
import { useProductFilter } from "../../hooks/use-product-filter";
import { cn } from "@/lib/utils";

export const ProductSort = () => {
  const [filters, setFilters] = useProductFilter();

  return (
    <div className="flex items-center">
      <Button
        className={cn(
          "rounded-full bg-white hover:bg-white",
          filters.sort !== "curated" &&
            "bg-transparent border-transparent hover:border-border hover:bg-transparent"
        )}
        variant={"secondary"}
        onClick={() => setFilters({ sort: "curated" })}
      >
        Curated
      </Button>
      <Button
        className={cn(
          "rounded-full bg-white hover:bg-white",
          filters.sort !== "newest" &&
            "bg-transparent border-transparent hover:border-border hover:bg-transparent"
        )}
        variant={"secondary"}
        onClick={() => setFilters({ sort: "newest" })}
      >
        Newest
      </Button>
      <Button
        className={cn(
          "rounded-full bg-white hover:bg-white",
          filters.sort !== "oldest" &&
            "bg-transparent border-transparent hover:border-border hover:bg-transparent"
        )}
        variant={"secondary"}
        onClick={() => setFilters({ sort: "oldest" })}
      >
        Oldest
      </Button>
    </div>
  );
};
