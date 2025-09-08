import type {
  ColDef,
  ColGroupDef,
  ValueFormatterParams,
  ValueParserParams,
} from "ag-grid-community";
import type { PriceRow } from "@/types";
import { toNumber } from "@/utils/toNumber";

export const priceColumns: (ColDef<PriceRow> | ColGroupDef<PriceRow>)[] = [
  { field: "id", headerName: "ID", maxWidth: 100, sort: "asc", sortable: true },
  { field: "productName", filter: true, headerName: "Product", minWidth: 120 },
  {
    children: [
      { field: "dirl1", headerName: "L1", maxWidth: 110 },
      { field: "dirl2", headerName: "L2", maxWidth: 110 },
      { field: "dir", headerName: "Dir", maxWidth: 130 },
    ],
    headerName: "Direction",
  },
  { field: "ccy", headerName: "Ccy", maxWidth: 100 },
  { field: "index", headerName: "Index", minWidth: 120 },
  { field: "startDate", headerName: "Start", maxWidth: 120 },
  { field: "endDate", headerName: "End", maxWidth: 120 },
  {
    cellClassRules: {
      "ag-negative": (p) =>
        toNumber(p.value as unknown) !== null &&
        (toNumber(p.value as unknown) as number) < 0,
    },
    field: "notional",
    headerName: "Notional",
    type: "rightAligned",
    valueFormatter: (p: ValueFormatterParams<PriceRow>) =>
      typeof p.value === "number"
        ? p.value.toLocaleString()
        : Number(p.value ?? 0).toLocaleString(),
  },
  {
    cellClassRules: {
      "ag-negative": (p) => (toNumber(p.value as unknown) ?? 0) < 0,
    },
    field: "npv",
    headerName: "NPV",
    type: "rightAligned",
    valueFormatter: (p) => {
      const n = toNumber(p.value as unknown);
      return n === null
        ? String(p.value ?? "")
        : n.toLocaleString(undefined, { maximumFractionDigits: 6 });
    },
  },
  {
    cellClassRules: {
      "ag-negative": (p) => (toNumber(p.value as unknown) ?? 0) < 0,
    },
    editable: true,
    field: "fixedRate",
    headerName: "Fixed Rate",
    singleClickEdit: true,
    valueFormatter: (p) => {
      const n = toNumber(p.value as unknown);
      return n === null
        ? String(p.value ?? "")
        : n.toLocaleString(undefined, { maximumFractionDigits: 6 });
    },
    valueParser: (p: ValueParserParams<PriceRow>) => {
      const n = toNumber(p.newValue as unknown);
      return n === null ? p.oldValue : n;
    },
  },
  { field: "dv01", headerName: "DV01", type: "rightAligned" },
  { field: "spreadL2", headerName: "Spr L2", type: "rightAligned" },
];
