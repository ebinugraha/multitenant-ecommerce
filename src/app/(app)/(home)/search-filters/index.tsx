import { CustomCategory } from "../types";
import { Categories } from "./categories";
import { SearchInput } from "./search-input";

interface SearchFiltersProps {
    data: CustomCategory[];
}

export const SearchFilters = ({data}:  SearchFiltersProps) => {
    return (
        <div className="px-4 flex flex-col py-4 bg-white border-b gap-4">
            <SearchInput data={data}/>
            <div className="hidden md:flex">
                <Categories data={data}/>
            </div>
        </div>
    )
}