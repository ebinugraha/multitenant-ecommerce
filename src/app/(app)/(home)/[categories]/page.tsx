import { ProductFilters } from "@/modules/products/ui/components/product-filters";
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
      <div className="px-4 lg:px-12 py-8 flex flex-col gap-4">
        <div className="grid grid-cols-1 lg:grid-cols-8 xl:grid-cols-12 gap-y-6 gap-x-8">
          <div className="lg:col-span-2 xl:col-span-2">
            <ProductFilters/>
          </div>
          <div className="lg:col-span-6 xl:col-span-10">
            <Suspense fallback={<ProductListSekeleton />}>
              <ProductList categories={categories} />
            </Suspense>
          </div>
        </div>
      </div>
    </HydrationBoundary>
  );
};

export default CategoriesPage;
