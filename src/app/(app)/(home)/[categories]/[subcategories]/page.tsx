interface Props {
  params: Promise<{
    categories: string;
    subcategories: string;
  }>;
}

const SubCategoriesPage = async ({ params }: Props) => {
  const { categories, subcategories } = await params;
  return (
    <div>
      {categories}
      {subcategories}
    </div>
  );
};

export default SubCategoriesPage;
