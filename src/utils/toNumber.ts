export const toNumber = (v: unknown): number | null => {
  if (typeof v === "number" && !Number.isNaN(v)) return v;
  if (typeof v === "string") {
    const n = Number(v.replace(/[^0-9+\-.]/g, ""));
    return Number.isFinite(n) ? n : null;
  }
  return null;
};
