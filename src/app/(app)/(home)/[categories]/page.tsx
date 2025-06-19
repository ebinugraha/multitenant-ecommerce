import { loadProductFilters } from "@/modules/products/search-params";
import { ProductFilters } from "@/modules/products/ui/components/product-filters";
import {
  ProductList,
  ProductListSekeleton,
} from "@/modules/products/ui/components/product-list";
import { ProductSort } from "@/modules/products/ui/components/product-sort";
import { caller, getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import type { SearchParams } from "nuqs";
import { Suspense } from "react";

interface Props {
  params: Promise<{
    categories: string;
  }>;
  searchParams: Promise<SearchParams>;
}

const CategoriesPage = async ({ params, searchParams }: Props) => {
  const { categories } = await params;
  const filters = await loadProductFilters(searchParams);

  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(
    trpc.products.getMany.queryOptions({
      categories,
      ...filters,
    })
  );

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="px-4 lg:px-12 py-8 flex flex-col gap-4">
        <div className="flex flex-col lg:flex-row lg:items-center gap-y-2 lg:gap-y-0 justify-between">
          <p className="text-2xl font-medium">Curated for you</p>
          <ProductSort />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-8 xl:grid-cols-12 gap-y-6 gap-x-8">
          <div className="lg:col-span-2 xl:col-span-2">
            <ProductFilters />
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
