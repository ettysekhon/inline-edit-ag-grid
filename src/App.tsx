import { useCallback, useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { useTheme } from '@/hooks/useTheme';
import type { PriceRow } from '@/types';
import { PriceTable } from '@/components/PriceTable';
import { fetchPrices } from '@/api/fetchPrices';

export default function App() {
  const { theme, setTheme } = useTheme();
  const [rowData, setRowData] = useState<PriceRow[]>([]);

  const onFetch = useCallback(async () => {
    try {
      const data = await fetchPrices();
      setRowData(data);
    } catch (error) {
      console.error('Error fetching prices:', error);
    }
  }, []);

  const onAddRow = useCallback(() => {
    const maxId = rowData.reduce((m, r) => Math.max(m, Number(r.id) || 0), 0);
    const newRow: PriceRow = {
      productName: 'IRS',
      startDate: '1Y',
      endDate: '10Y',
      ccy: 'USD',
      fixedRate: 0,
      notional: 0,
      id: String(maxId + 1),
    };
    setRowData((prev) => [...prev, newRow].sort((a, b) => Number(a.id) - Number(b.id)));
  }, [rowData]);

  return (
    <div className="flex h-screen flex-col">
      <Navbar
        theme={theme}
        onToggleTheme={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        onFetch={onFetch}
        onAddRow={onAddRow}
      />

      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-4">
        <PriceTable data={rowData} onDataChange={setRowData} theme={theme} />
      </main>
    </div>
  );
}
