import { loadProductFilters } from "@/modules/products/search-params";
import { ProductListView } from "@/modules/products/ui/views/product-list-views";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import type { SearchParams } from "nuqs";

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
      <ProductListView categories={categories} />
    </HydrationBoundary>
  );
};

export default CategoriesPage;
