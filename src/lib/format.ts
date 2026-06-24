/**
 * Single source of truth for value formatting across the app.
 *
 * Do NOT inline `.toLocaleString(...)` for money/dates in components, and do
 * NOT create new formatter helpers elsewhere. Import from here. For rendering
 * money in the UI prefer the <MoneyText> component, which wraps formatBRL.
 */

/** Brazilian Real, e.g. 1234.5 -> "R$ 1.234,50". */
export function formatBRL(value: number): string {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

/**
 * Money with an explicit leading sign, e.g. 1234.5 -> "+ R$ 1.234,50",
 * -75 -> "− R$ 75,00". Uses a true minus sign (−), not a hyphen.
 */
export function formatBRLSigned(value: number): string {
  const abs = Math.abs(value).toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return `${value >= 0 ? "+" : "−"} R$ ${abs}`;
}

/** ISO date string -> "dd/mm/aaaa". */
export function formatDateBR(iso: string): string {
  return new Date(iso).toLocaleDateString("pt-BR");
}

/** ISO date string -> "hh:mm". */
export function formatTimeBR(iso: string): string {
  return new Date(iso).toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

/** ISO date string -> "dd/mm/aaaa, hh:mm". */
export function formatDateTimeBR(iso: string): string {
  const d = new Date(iso);
  return `${d.toLocaleDateString("pt-BR")}, ${d.toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  })}`;
}

/** Mask the middle of a CPF/CNPJ for privacy, e.g. "123.***.***-09". */
export function maskDoc(doc: string): string {
  const digits = doc.replace(/\D/g, "");
  if (digits.length === 11) {
    return `${digits.slice(0, 3)}.***.***-${digits.slice(9)}`;
  }
  if (digits.length === 14) {
    return `${digits.slice(0, 2)}.***.***/****-${digits.slice(12)}`;
  }
  return doc;
}
