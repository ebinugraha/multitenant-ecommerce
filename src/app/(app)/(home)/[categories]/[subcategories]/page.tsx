import {
  ProductList,
  ProductListSekeleton,
} from "@/modules/products/ui/components/product-list";
import { caller, getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Suspense } from "react";

interface Props {
  params: Promise<{
    subcategories: string;
  }>;
}

const SubCategoriesPage = async ({ params }: Props) => {
  const { subcategories } = await params;

  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(
    trpc.products.getMany.queryOptions({
      categories: subcategories,
    })
  );

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<ProductListSekeleton />}>
        <ProductList categories={subcategories} />
      </Suspense>
    </HydrationBoundary>
  );
};

export default SubCategoriesPage;
