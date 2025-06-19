"use client";

import { cn } from "@/lib/utils";
import { ChevronDown, ChevronRight } from "lucide-react";
import { useState } from "react";
import { PriceList } from "./price-list";
import { useProductFilter } from "../../hooks/use-product-filter";
import { TagFilter } from "./tags-filter";

interface ProductFilterProps {
  className?: string;
  children: React.ReactNode;
  title: string;
}

const ProductFilter = ({ className, children, title }: ProductFilterProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const Icon = isOpen ? ChevronDown : ChevronRight;

  return (
    <div className={cn("p-4 border-b flex flex-col gap-2", className)}>
      <div
        className="flex items-center justify-between cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <p className="font-semibold">{title}</p>
        <Icon />
      </div>
      {isOpen && children}
    </div>
  );
};

export const ProductFilters = () => {
  const [filters, setFilters] = useProductFilter();

  const hasAnyFilters = Object.entries(filters).some(([, value]) => {
    if (typeof value === "string") {
      return value !== "";
    }
    return value !== null;
  });

  const onClear = () => {
    setFilters({
      maxPrice: "",
      minPrice: "",
      tags: [],
    });
  };

  const onChange = (key: keyof typeof filters, value: unknown) => {
    setFilters({
      ...filters,
      [key]: value,
    });
  };

  return (
    <div className="border rounded-md bg-white">
      <div className="p-4 border-b  flex items-center justify-between">
        <p className="font-semibold">Filters</p>

        {hasAnyFilters && (
          <button
            className="underline cursor-pointer"
            onClick={onClear}
            type="button"
          >
            Clear
          </button>
        )}
      </div>
      <ProductFilter title="Price Filter">
        <PriceList
          minPrice={filters.minPrice}
          maxPrice={filters.maxPrice}
          onMaxPriceChange={(value) => onChange("maxPrice", value)}
          onMinPriceChange={(value) => onChange("minPrice", value)}
        />
      </ProductFilter>
      <ProductFilter title="Price Filter">
        <TagFilter
          values={filters.tags}
          onChange={(value) => {
            onChange("tags", value);
          }}
        />
      </ProductFilter>
    </div>
  );
};
