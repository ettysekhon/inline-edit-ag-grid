import {
  ColDef,
  ColGroupDef,
  ValueFormatterParams,
  ValueParserParams,
} from "ag-grid-community";
import type { PriceRow } from "@/types";
import { toNumber } from "@/utils/toNumber";

export const priceColumns: (ColDef<PriceRow> | ColGroupDef<PriceRow>)[] = [
  { field: "id", headerName: "ID", minWidth: 80, sortable: true, sort: "asc" },
  { field: "productName", headerName: "Product", minWidth: 150, filter: true },
  {
    headerName: "Direction",
    children: [
      { field: "dirl1", headerName: "L1", minWidth: 80 },
      { field: "dirl2", headerName: "L2", minWidth: 80 },
      { field: "dir", headerName: "Dir", minWidth: 100 },
    ],
  },
  { field: "ccy", headerName: "Ccy", minWidth: 80 },
  { field: "index", headerName: "Index", minWidth: 150 },
  { field: "startDate", headerName: "Start", minWidth: 120 },
  { field: "endDate", headerName: "End", minWidth: 120 },
  {
    field: "notional",
    headerName: "Notional",
    type: "rightAligned",
    minWidth: 150,
    valueFormatter: (p: ValueFormatterParams<PriceRow>) =>
      typeof p.value === "number"
        ? p.value.toLocaleString()
        : Number(p.value ?? 0).toLocaleString(),
    cellClassRules: {
      "ag-negative": (p) =>
        toNumber(p.value as unknown) !== null &&
        (toNumber(p.value as unknown) as number) < 0,
    },
  },
  {
    field: "npv",
    headerName: "NPV",
    type: "rightAligned",
    minWidth: 150,
    valueFormatter: (p) => {
      const n = toNumber(p.value as unknown);
      return n === null
        ? String(p.value ?? "")
        : n.toLocaleString(undefined, { maximumFractionDigits: 6 });
    },
    cellClassRules: {
      "ag-negative": (p) => (toNumber(p.value as unknown) ?? 0) < 0,
    },
  },
  {
    field: "fixedRate",
    headerName: "Fixed Rate",
    editable: true,
    singleClickEdit: true,
    minWidth: 150,
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
    cellClassRules: {
      "ag-negative": (p) => (toNumber(p.value as unknown) ?? 0) < 0,
    },
  },
  { field: "dv01", headerName: "DV01", type: "rightAligned", minWidth: 120 },
  {
    field: "spreadL2",
    headerName: "Spr L2",
    type: "rightAligned",
    minWidth: 120,
  },
];
