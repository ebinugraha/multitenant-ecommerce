interface Props {
  params: Promise<{
    categories: string;
  }>;
}

const CategoriesPage = async ({ params }: Props) => {
  const { categories } = await params;

  return <div>Categories page : {categories}</div>;
};

export default CategoriesPage;
