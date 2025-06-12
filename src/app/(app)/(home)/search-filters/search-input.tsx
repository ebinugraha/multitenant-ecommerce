"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DropletIcon, ListFilterIcon, SearchIcon } from "lucide-react";
import { useState } from "react";
import { CategorySidebar } from "./category-sidebar";
import { CustomCategory } from "../types";

interface Props {
  disable?: boolean;
  data: CustomCategory[];
}

export const SearchInput = ({ disable, data }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex items-center gap-2 w-full">
      
      <CategorySidebar isOpen={isOpen} onOpenChange={setIsOpen} data={data} />

      <div className="relative w-full">
        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-neutral-500" />
        <Input className="pl-8" placeholder="Search..." disabled={disable} />
      </div>
      <Button
        variant={"elevated"}
        onClick={() => setIsOpen(true)}
        className="md:hidden flex"
      >
        <ListFilterIcon />
      </Button>
      {/* TODO: Add categories view all button, visible on mobile */}
      {/* TODO: Add library button, visible on user login */}
    </div>
  );
};
