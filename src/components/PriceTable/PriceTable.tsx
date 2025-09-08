import { DataGrid } from "@/components/DataGrid";
import type { PriceRow } from "@/types";
import { priceColumns } from "./priceColumns";

interface PriceTableProps {
  data: PriceRow[];
  onDataChange: (newData: PriceRow[]) => void;
  theme: 'light' | 'dark';
}

export function PriceTable({ data, onDataChange, theme }: PriceTableProps) {
  return (
    <DataGrid<PriceRow>
      columns={priceColumns}
      data={data}
      onDataChange={onDataChange}
      theme={theme}
    />
  );
}
