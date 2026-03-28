"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.INCOME_CHANNEL_SET = exports.INCOME_CHANNELS = void 0;
exports.parseIncomeChannelList = parseIncomeChannelList;
exports.INCOME_CHANNELS = [
    'cash_receipt',
    'pos',
    'benefit_pay',
];
exports.INCOME_CHANNEL_SET = new Set(exports.INCOME_CHANNELS);
function parseIncomeChannelList(raw) {
    if (raw === undefined || raw === null || raw === '')
        return undefined;
    const parts = raw
        .split(',')
        .map((s) => s.trim().toLowerCase())
        .filter(Boolean);
    const out = [];
    for (const p of parts) {
        if (p === 'untagged')
            out.push('untagged');
        else if (exports.INCOME_CHANNEL_SET.has(p))
            out.push(p);
    }
    return out.length ? out : undefined;
}
//# sourceMappingURL=income-channels.js.map