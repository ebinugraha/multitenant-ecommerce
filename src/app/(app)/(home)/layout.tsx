import { getPayload } from "payload";
import { Footer } from "./footer";
import { Navbar } from "./navbar";
import { SearchFilters } from "./search-filters";
import configPromise from "@payload-config";
import { Category } from "@/payload-types";
import { CustomCategory } from "./types";

const HomeLayout = async ({ children }: { children: React.ReactNode }) => {
  const payload = await getPayload({
    config: configPromise,
  });

  // hanya menampilkan kategori yang tidak memiliki parent
  const data = await payload.find({
    depth: 1, // menghindari infinite loop
    collection: "categories",
    pagination: false,
    where: {
      parent: {
        exists: false,
      },
    },
    sort: "name",
  });

  const formattedData:  CustomCategory[] = data.docs.map((doc) => ({
    ...doc,
    subcategories: (doc.subcategories?.docs ?? []).map((sub) => ({
        ...(sub as Category),
        subcategories: undefined
    }))
  }))


  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <SearchFilters data={formattedData} />
      <div className="flex-1 bg-[#f3f4ef]">{children}</div>
      <Footer />
    </div>
  );
};

export default HomeLayout;
