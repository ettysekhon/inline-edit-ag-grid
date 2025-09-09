import { DataGrid } from "@/components/DataGrid";
import type { PriceRow, ThemeType } from "@/types";
import { priceColumns } from "./priceColumns";

interface PriceTableProps {
  data: PriceRow[];
  onDataChange: (newData: PriceRow[]) => void;
  theme: ThemeType;
}

export function PriceTable({ data, onDataChange, theme }: PriceTableProps) {
  return (
    <DataGrid<PriceRow>
      columns={priceColumns}
      data={data}
      onDataChange={onDataChange}
      getRowId={(params) => String(params.data.id)}
      theme={theme}
    />
  );
}
