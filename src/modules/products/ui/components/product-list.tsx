"use client";

import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";

interface Props {
  categories?: string;
}

export const ProductList = ({ categories }: Props) => {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(
    trpc.products.getMany.queryOptions({
      categories,
    })
  );

  return <div>{JSON.stringify(data, null, 2)}</div>;
};

export const ProductListSekeleton = () => {
  return <div>loading...</div>;
};
