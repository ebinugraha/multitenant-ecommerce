import { loadProductFilters } from "@/modules/products/search-params";
import {
  ProductList,
  ProductListSekeleton,
} from "@/modules/products/ui/components/product-list";
import { ProductListView } from "@/modules/products/ui/views/product-list-views";
import { caller, getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { SearchParams } from "nuqs";
import { Suspense } from "react";

interface Props {
  params: Promise<{
    subcategories: string;
  }>;
  searchParams: Promise<SearchParams>;
}

const SubCategoriesPage = async ({ params, searchParams }: Props) => {
  const { subcategories } = await params;
  const filters = await loadProductFilters(searchParams);

  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(
    trpc.products.getMany.queryOptions({
      categories: subcategories,
      ...filters,
    })
  );

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProductListView categories={subcategories} />
    </HydrationBoundary>
  );
};

export default SubCategoriesPage;
