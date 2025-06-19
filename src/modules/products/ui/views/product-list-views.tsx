import { Suspense } from "react"
import { ProductFilters } from "../components/product-filters"
import { ProductSort } from "../components/product-sort"
import { ProductList, ProductListSekeleton } from "../components/product-list"

interface Props {
    categories?: string
}

export const ProductListView = ({categories}: Props) => {
    return (
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
    )
}