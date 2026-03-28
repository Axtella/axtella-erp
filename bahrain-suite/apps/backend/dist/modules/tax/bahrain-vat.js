"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BAHRAIN_VAT_RATE = void 0;
exports.vatFromNet = vatFromNet;
exports.vatFromGross = vatFromGross;
exports.BAHRAIN_VAT_RATE = 0.1;
function round2(n) {
    return Math.round(n * 100) / 100;
}
function vatFromNet(amountNet) {
    const vatAmount = round2(amountNet * exports.BAHRAIN_VAT_RATE);
    return {
        rate: exports.BAHRAIN_VAT_RATE,
        amountNet: round2(amountNet),
        vatAmount,
        amountGross: round2(amountNet + vatAmount),
    };
}
function vatFromGross(amountGross) {
    const net = amountGross / (1 + exports.BAHRAIN_VAT_RATE);
    const amountNet = round2(net);
    const vatAmount = round2(amountGross - amountNet);
    return {
        rate: exports.BAHRAIN_VAT_RATE,
        amountNet,
        vatAmount,
        amountGross: round2(amountGross),
    };
}
//# sourceMappingURL=bahrain-vat.js.map