export declare class TaxController {
    fromNet(amount: string): {
        rate: number;
        amountNet: number;
        vatAmount: number;
        amountGross: number;
        jurisdiction: string;
    };
    fromGross(amount: string): {
        rate: number;
        amountNet: number;
        vatAmount: number;
        amountGross: number;
        jurisdiction: string;
    };
}
