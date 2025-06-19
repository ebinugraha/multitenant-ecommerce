import { Checkbox } from "@/components/ui/checkbox";
import { useTRPC } from "@/trpc/client";
import { useInfiniteQuery } from "@tanstack/react-query";
import { LoaderIcon } from "lucide-react";

interface Props {
  values?: string[] | null;
  onChange: (value: string[]) => void;
}

export const TagFilter = ({ values, onChange }: Props) => {
  const trpc = useTRPC();

  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery(
      trpc.tags.getMany.infiniteQueryOptions(
        {
          limit: 10,
        },
        {
          getNextPageParam: (lastPage) => {
            return lastPage.docs.length > 0 ? lastPage.nextPage : undefined;
          },
        }
      )
    );

  const onClick = (tag: string) => {
    // mengecek jika values dari filters sama dengan value yang sudah di checked
    if (values?.includes(tag)) {
      // membuat memfilter tag untuk di buang
      onChange(values?.filter((t) => t !== tag) || []);
    } else {
      onChange([...(values || []), tag]);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      {isLoading ? (
        <LoaderIcon className="animate-spin h-5 w-5" />
      ) : (
        data?.pages.map((page) =>
          page.docs.map((tags) => (
            <div
              className="flex items-center justify-between cursor-pointer"
              key={tags.id}
              onClick={() => onClick(tags.name)}
            >
              <p>{tags.name}</p>
              <Checkbox
                checked={values?.includes(tags.name)}
                onCheckedChange={() => onClick(tags.name)}
              />
            </div>
          ))
        )
      )}
      {hasNextPage && (
        <button
          disabled={isFetchingNextPage}
          className="underline font-medium justify-start text-start disabled:opacity-50"
        >
          Load more
        </button>
      )}
    </div>
  );
};
