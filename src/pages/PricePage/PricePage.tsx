import { useCallback, useState } from "react";
import { fetchPrices } from "@/api/fetchPrices";
import { Navbar } from "@/components/Navbar";
import { useTheme } from "@/hooks/useTheme";
import { PriceTable } from "@/pages/PricePage/PriceTable";
import { type PriceRow, Theme } from "@/types";

export function PricePage() {
  const { theme, setTheme } = useTheme();
  const [rowData, setRowData] = useState<PriceRow[]>([]);

  const onFetch = useCallback(async () => {
    try {
      const data = await fetchPrices();
      setRowData(data);
    } catch (error) {
      console.error("Error fetching prices:", error);
    }
  }, []);

  const onAddRow = useCallback(() => {
    const maxId = rowData.reduce((m, r) => Math.max(m, Number(r.id) || 0), 0);
    const newRow: PriceRow = {
      ccy: "USD",
      endDate: "10Y",
      fixedRate: 0,
      id: maxId + 1,
      notional: 0,
      productName: "IRS",
      startDate: "1Y",
    };
    setRowData((prev) =>
      [...prev, newRow].sort((a, b) => Number(a.id) - Number(b.id))
    );
  }, [rowData]);

  return (
    <div className="flex h-screen flex-col">
      <Navbar
        theme={theme}
        onToggleTheme={() =>
          setTheme(theme === Theme.DARK ? Theme.LIGHT : Theme.DARK)
        }
        onFetch={onFetch}
        onAddRow={onAddRow}
      />

      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-4">
        <PriceTable data={rowData} onDataChange={setRowData} theme={theme} />
      </main>
    </div>
  );
}
