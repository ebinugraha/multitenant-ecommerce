import { Skeleton } from "@/components/ui/skeleton";
import { StarIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface Props {
  id: string;
  name: string;
  imageUrl?: string | null | undefined;
  authorUsername: string;
  authorImageUrl?: string | null | undefined;
  reviewRating: number;
  reviewCount: number;
  price: number;
}

export const ProductCard = ({
  id,
  name,
  imageUrl,
  authorUsername,
  authorImageUrl,
  reviewRating,
  reviewCount,
  price,
}: Props) => {
  return (
    <Link href={`/products/${id}`}>
      <div className="hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-shadow rounded-md border bg-white overflow-hidden h-full flex flex-col">
        <div className="relative aspect-square">
          <Image
            alt={name}
            fill
            className="object-cover"
            src={imageUrl || "/placeholder.png"}
          />
        </div>
        <div className="p-4 border-y flex flex-col gap-3 flex-1">
          <h2 className="text-lg font-medium line-clamp-4">{name}</h2>
          <div className="flex items-center gap-2">
            {authorImageUrl && (
              <Image
                alt={authorUsername}
                src={authorImageUrl}
                width={16}
                height={16}
                className="rounded-full border shrink-0 size-[16px]"
              />
            )}
            <p className="text-sm underline font-medium">{authorUsername}</p>
          </div>
          {reviewCount > 0 && (
            <div className="flex items-center gap-1">
              <StarIcon size={20} className="fill-yellow-400" />
              <span className="text-sm">
                {reviewRating}({reviewCount})
              </span>
            </div>
          )}
        </div>
        <div className="p-2">
          <div className="relative px-2 py-1 w-fit">
            <p className="text-xl font-medium">
              {new Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR",
                minimumFractionDigits: 0,
                maximumFractionDigits: 2,
              }).format(price)}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export const ProductCardSkeleton = () => {
  return (
    <div className="w-full aspect-3/4 rounded-lg border bg-white p-2">
      <Skeleton className="w-full aspect-square" />;
      <Skeleton className="w-full h-10" />;
    </div>
  );
};
