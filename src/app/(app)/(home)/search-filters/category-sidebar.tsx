"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { CustomCategory } from "../types";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { useRouter } from "next/navigation";

interface CategorySidebarProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  data: CustomCategory[];
}

export const CategorySidebar = ({
  isOpen,
  onOpenChange,
  data,
}: CategorySidebarProps) => {
  const [parentCategories, setParentCategories] = useState<
    CustomCategory[] | null
  >(null);
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] =
    useState<CustomCategory | null>(null);

  const currectCategory = parentCategories ?? data ?? [];

  const handleOpenChange = (open: boolean) => {
    onOpenChange(open);
    setParentCategories(null);
    setSelectedCategory(null);
  };

  const handleBackClick = () => {
    if(parentCategories) {
        setParentCategories(null)
        setSelectedCategory(null);
    }
  }

  const handleCategoryClick = (category: CustomCategory) => {
    if (category.subcategories && category.subcategories.length > 0) {
      setParentCategories(category.subcategories as CustomCategory[]);
      setSelectedCategory(category);
    } else {
      if (parentCategories && selectedCategory) {
        router.push(`/${selectedCategory.slug}/${category.slug}`);
      } else {
        if (category.slug === "all") {
          router.push("/");
        } else {
          router.push(`/${category.slug}`);
        }
      }

      handleOpenChange(false);
    }
  };

    const backgroundColor = selectedCategory?.color || "#f5f5f5";

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent
        side="left"
        className="p-0 transition-none"
        style={{ backgroundColor  }}
      >
        <SheetHeader className="p-4 border-b">
          <SheetTitle className="text-lg font-semibold">Categories</SheetTitle>
        </SheetHeader>
        <ScrollArea className="flex flex-col overflow-y-auto h-full pb-2">
          {parentCategories && (
            <button
              onClick={handleBackClick}
              className="w-full text-left p-4 hover:bg-black hover:text-white flex items-center text-base font-medium"
            >
              <ChevronLeftIcon className="size-4 mr-2" />
              Back
            </button>
          )}
          {currectCategory.map((category) => (
            <button
              className="w-full text-left p-4 hover:bg-black hover:text-white flex justify-between items-center text-base font-medium"
              key={category.slug}
              onClick={() => handleCategoryClick(category)}
            >
              {category.name}
              {category.subcategories && category.subcategories.length > 0 && (
                <ChevronRightIcon />
              )}
            </button>
          ))}
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};
