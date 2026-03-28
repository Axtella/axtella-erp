export declare const BAHRAIN_VAT_RATE = 0.1;
export interface VatBreakdown {
    rate: number;
    amountNet: number;
    vatAmount: number;
    amountGross: number;
}
export declare function vatFromNet(amountNet: number): VatBreakdown;
export declare function vatFromGross(amountGross: number): VatBreakdown;
