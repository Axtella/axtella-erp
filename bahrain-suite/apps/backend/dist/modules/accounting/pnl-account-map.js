"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.classifyAccount = classifyAccount;
exports.lineSignedPnlAmount = lineSignedPnlAmount;
const norm = (code) => code.replace(/\s/g, '').toUpperCase();
function classifyAccount(accountCode) {
    const c = norm(accountCode);
    const head2 = c.slice(0, 2);
    const head3 = c.slice(0, 3);
    if (head2 === '40' || head3 === '400') {
        return { kind: 'revenue', revenueKey: 'residential' };
    }
    if (head2 === '41' || head3 === '410') {
        return { kind: 'revenue', revenueKey: 'commercial' };
    }
    if (head2 === '42' || head2 === '43' || head2 === '44') {
        return { kind: 'revenue', revenueKey: 'other' };
    }
    if (head2 === '4') {
        return { kind: 'revenue', revenueKey: 'other' };
    }
    if (head2 === '60' || head3 === '600') {
        return { kind: 'expense', expenseKey: 'payroll' };
    }
    if (head2 === '61' || head3 === '610') {
        return { kind: 'expense', expenseKey: 'utilities' };
    }
    if (head2 === '62' || head3 === '620') {
        return { kind: 'expense', expenseKey: 'amc' };
    }
    if (head2 === '63' || head3 === '630') {
        return { kind: 'expense', expenseKey: 'government' };
    }
    if (head2 === '64' || head3 === '640') {
        return { kind: 'expense', expenseKey: 'ownerRent' };
    }
    if (head2 === '65' || head3 === '650') {
        return { kind: 'expense', expenseKey: 'maintenance' };
    }
    if (/^[6-8]/.test(c)) {
        return { kind: 'expense', expenseKey: 'other' };
    }
    return { kind: 'expense', expenseKey: 'other' };
}
function lineSignedPnlAmount(accountCode, debit, credit) {
    const classification = classifyAccount(accountCode);
    const d = Number(debit) || 0;
    const cr = Number(credit) || 0;
    if (classification.kind === 'revenue') {
        return { classification, amount: cr - d };
    }
    return { classification, amount: d - cr };
}
//# sourceMappingURL=pnl-account-map.js.map