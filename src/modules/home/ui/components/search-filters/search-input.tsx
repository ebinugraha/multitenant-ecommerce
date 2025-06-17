"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Bookmark, ListFilterIcon, SearchIcon } from "lucide-react";
import { useState } from "react";
import { CategorySidebar } from "./category-sidebar";
import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

interface Props {
  disable?: boolean;
}

export const SearchInput = ({ disable }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const trpc = useTRPC();
  const session = useQuery(trpc.auth.session.queryOptions());

  return (
    <div className="flex items-center gap-2 w-full">
      <CategorySidebar isOpen={isOpen} onOpenChange={setIsOpen} />

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

      {session.data?.user && (
        <Button variant={"elevated"} asChild>
          <Link href={"/library"}>
            Library
            <Bookmark />
          </Link>
        </Button>
      )}
    </div>
  );
};
