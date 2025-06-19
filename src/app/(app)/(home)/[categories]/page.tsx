import {
  ProductList,
  ProductListSekeleton,
} from "@/modules/products/ui/components/product-list";
import { caller, getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Suspense } from "react";

interface Props {
  params: Promise<{
    categories: string;
  }>;
}

const CategoriesPage = async ({ params }: Props) => {
  const { categories } = await params;

  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(
    trpc.products.getMany.queryOptions({
      categories,
    })
  );

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<ProductListSekeleton />}>
        <ProductList categories={categories} />
      </Suspense>
    </HydrationBoundary>
  );
};

export default CategoriesPage;
