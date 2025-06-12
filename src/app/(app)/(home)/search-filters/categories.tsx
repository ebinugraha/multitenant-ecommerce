"use client";

import { CategoryDropdown } from "./category-dropdown";
import { CustomCategory } from "../types";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ListFilterIcon } from "lucide-react";
import { CategorySidebar } from "./category-sidebar";

interface CategoriesProps {
  data: CustomCategory[];
}

export const Categories = ({ data }: CategoriesProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const measureRef = useRef<HTMLDivElement>(null);
  const viewAllRef = useRef<HTMLDivElement>(null);

  const [visibleCount, setVisibleCount] = useState(data.length);
  const [isAnyHovered, setIsAnyHovered] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const activeCategory = "all";

  const activeCategoryIndex = data.findIndex(
    (category) => category.slug === activeCategory
  );
  const isActiveCategoryHidden =
    activeCategoryIndex >= visibleCount && activeCategoryIndex !== -1;

  useEffect(() => {
    const calculateVisibleCount = () => {
      if (!containerRef.current || !measureRef.current || !viewAllRef.current)
        return;

      const containerWidth = containerRef.current.offsetWidth;
      const viewAllWidth = viewAllRef.current.offsetWidth;
      const avaibleWidth = containerWidth - viewAllWidth;

      const items = Array.from(measureRef.current.children);

      let totalWidth = 0;
      let visibleCount = 0;

      for (const item of items) {
        const itemWidth = item.getBoundingClientRect().width;

        console.log(
          `Item width: ${itemWidth}, Total width: ${totalWidth}, Available width: ${avaibleWidth}`)

        if (totalWidth + itemWidth >= avaibleWidth) break;

        totalWidth += itemWidth;
        visibleCount++;
      }

      setVisibleCount(visibleCount);
    };

    const resizeObserver = new ResizeObserver(calculateVisibleCount);
    resizeObserver.observe(containerRef.current!);

    return () => {
      resizeObserver.disconnect();
    };
  }, [data.length]);

  return (
    <div className="relative w-full">

        <CategorySidebar
            isOpen={isSidebarOpen}
            onOpenChange={setIsSidebarOpen}
            data={data}
        />

      <div
        ref={measureRef}
        className="absolute opacity-0 pointer-events-none flex"
        style={{ position: "fixed", top: -9999, left: -9999 }}
      >
        {data.map((category) => (
          <div key={category.id}>
            <CategoryDropdown
              category={category}
              isActive={activeCategory == category.slug}
              isNavigationHovered={false}
            />
          </div>
        ))}
      </div>
      {/* visible item */}
      <div
        ref={containerRef}
        onMouseEnter={() => setIsAnyHovered(true)}
        onMouseLeave={() => setIsAnyHovered(false)}
        className="flex flex-nowrap items-center"
      >
        {data.slice(0, visibleCount).map((category) => (
          <div key={category.id}>
            <CategoryDropdown
              category={category}
              isActive={activeCategory == category.slug}
              isNavigationHovered={isAnyHovered}
            />
          </div>
        ))}

        <div className="shrink-0" ref={viewAllRef}>
            <Button
            variant={"elevated"}
                className={cn("h-11 px-4 bg-transparent border-transparent hover:bg-white hover:border-primary text-black",
            isActiveCategoryHidden && !isAnyHovered && "bg-white border-primary")}
            onClick={() => setIsSidebarOpen(true)}
            >
                View All
                <ListFilterIcon className="ml-2"/>
            </Button>
        </div>
      </div>
    </div>
  );
};
