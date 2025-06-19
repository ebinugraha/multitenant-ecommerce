import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ChangeEvent, ChangeEventHandler } from "react";

interface PriceListProps {
  minPrice?: string | null;
  maxPrice?: string | null;
  onMinPriceChange: (value: string) => void;
  onMaxPriceChange: (value: string) => void;
}

function formatRupiahFromString(amountString: string): string {
  const cleanedString = amountString.replace(/[^0-9,-]+/g, "");

  const amountNumber = parseFloat(cleanedString);

  if (isNaN(amountNumber)) {
    return "Invalid Number";
  }

  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amountNumber);
}

export const PriceList = ({
  minPrice,
  maxPrice,
  onMinPriceChange,
  onMaxPriceChange,
}: PriceListProps) => {
  const handleMinimumPriceChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    onMinPriceChange(value);
  };

  const handleMaximumPriceChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    onMaxPriceChange(value);
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col gap-2">
        <Label className="text-base font-medium">Min price</Label>
        <Input
          type="text"
          placeholder="Rp. 0"
          value={minPrice ? formatRupiahFromString(minPrice) : ""}
          onChange={handleMinimumPriceChange}
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label className="text-base font-medium">Max price</Label>
        <Input
          type="text"
          placeholder=""
          value={maxPrice ? formatRupiahFromString(maxPrice) : "∞"}
          onChange={handleMaximumPriceChange}
        />
      </div>
    </div>
  );
};
