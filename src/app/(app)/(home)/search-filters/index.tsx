import { Categories } from "./categories";
import { SearchInput } from "./search-input";

interface SearchFiltersProps {
    data: any;
}

export const SearchFilters = ({data}:  SearchFiltersProps) => {
    return (
        <div className="px-4 flex flex-col py-4 bg-white border-b gap-4">
            <SearchInput/>
            <Categories data={data}/>
        </div>
    )
}