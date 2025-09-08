import type { PriceRow } from "@/types";

const API_URL = "https://66fa9f38afc569e13a9c7bbf.mockapi.io/api/getPrices";

export async function fetchPrices(): Promise<PriceRow[]> {
  const res = await fetch(API_URL);
  if (!res.ok) {
    throw new Error("Failed to fetch prices");
  }
  const data = (await res.json()) as PriceRow[];

  const mapped: PriceRow[] = data
    .map((r: PriceRow) => ({
      ccy: r.ccy ?? "USD",
      createdAt: r.createdAt,
      dir: r.dir,
      dirl1: r.dirl1,
      dirl2: r.dirl2,
      dv01: r.dv01,
      endDate: r.endDate ?? "",
      fixedRate: r.fixedRate ?? 0,
      id: String(r.id ?? crypto.randomUUID()),
      index: r.index,
      notional: r.notional ?? 0,
      npv: r.npv,
      productName: r.productName ?? "IRS",
      spreadL2: r.spreadL2,
      startDate: r.startDate ?? "",
      updateData: r.updateData,
    }))
    .sort((a, b) => Number(a.id) - Number(b.id));

  return mapped;
}
