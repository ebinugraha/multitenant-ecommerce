import {
  useQueryStates,
  parseAsString,
  parseAsArrayOf,
  parseAsStringLiteral,
} from "nuqs";

const sortValues = ["curated", "newest", "oldest"] as const;

const params = {
  sort: parseAsStringLiteral(sortValues).withDefault("curated"),
  minPrice: parseAsString.withOptions({
    clearOnDefault: true,
  }).withDefault(''),
  maxPrice: parseAsString.withOptions({
    clearOnDefault: true,
  }).withDefault(''),
  tags: parseAsArrayOf(parseAsString).withOptions({
    clearOnDefault: true,
  }).withDefault([]),
};

export const useProductFilter = () => {
  return useQueryStates(params);
};
