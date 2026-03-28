/** Kingdom of Bahrain standard VAT rate (10%). */
export const BAHRAIN_VAT_RATE = 0.1;

function round2(n: number): number {
  return Math.round(n * 100) / 100;
}

export interface VatBreakdown {
  rate: number;
  amountNet: number;
  vatAmount: number;
  amountGross: number;
}

/** VAT computed from tax-exclusive (net) amount. */
export function vatFromNet(amountNet: number): VatBreakdown {
  const vatAmount = round2(amountNet * BAHRAIN_VAT_RATE);
  return {
    rate: BAHRAIN_VAT_RATE,
    amountNet: round2(amountNet),
    vatAmount,
    amountGross: round2(amountNet + vatAmount),
  };
}

/** Reverse-calculate net and VAT from tax-inclusive (gross) amount. */
export function vatFromGross(amountGross: number): VatBreakdown {
  const net = amountGross / (1 + BAHRAIN_VAT_RATE);
  const amountNet = round2(net);
  const vatAmount = round2(amountGross - amountNet);
  return {
    rate: BAHRAIN_VAT_RATE,
    amountNet,
    vatAmount,
    amountGross: round2(amountGross),
  };
}
