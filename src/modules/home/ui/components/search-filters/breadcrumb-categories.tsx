import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";

interface Props {
  activeCategories?: string | null;
  activeSubCategoryName?: string | null;
  categoriesName?: string | null;
}

export const BreadcrumbCategories = ({
  activeCategories,
  activeSubCategoryName,
  categoriesName,
}: Props) => {
  if (activeCategories === "all" || !categoriesName) {
    return null;
  }

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {activeSubCategoryName ? (
          <>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link
                  href={`/${activeCategories}`}
                  className="text-black font-medium underline text-xl"
                >
                  {categoriesName}
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="text-black font-medium text-xl">
              /
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbLink className="text-black font-medium text-xl">
                {activeSubCategoryName}
              </BreadcrumbLink>
            </BreadcrumbItem>
          </>
        ) : (
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link
                href={`/${activeCategories}`}
                className="text-black font-medium underline text-xl"
              >
                {categoriesName}
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
        )}
      </BreadcrumbList>
    </Breadcrumb>
  );
};
