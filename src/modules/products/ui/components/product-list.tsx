"use client";

import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useProductFilter } from "../../hooks/use-product-filter";

interface Props {
  categories?: string;
}

export const ProductList = ({ categories }: Props) => {

  const [filters] = useProductFilter()

  const trpc = useTRPC();
  const { data } = useSuspenseQuery(
    trpc.products.getMany.queryOptions({
      categories,
      ...filters
    })
  );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-4">
      {data.docs.map((product) => (
        <div key={product.id} className="border rounded-md bg-white p-4">
          <h2>{product.name}</h2>
          <h2>Rp. {product.price}</h2>
        </div>
      ))}
    </div>
  );
};

export const ProductListSekeleton = () => {
  return <div>loading...</div>;
};
