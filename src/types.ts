export type PriceRow = {
  id?: string | number;
  productName?: string;
  ccy?: string;
  dir?: string;
  dirl1?: string;
  dirl2?: string;
  dv01?: string | number;
  endDate?: string;
  fixedRate?: string | number;
  index?: string;
  notional?: number;
  npv?: string | number;
  spreadL2?: string | number;
  startDate?: string;
  createdAt?: unknown[];
  updateData?: {
    fixedRate?: string | number;
    id?: string | number;
  };
};
