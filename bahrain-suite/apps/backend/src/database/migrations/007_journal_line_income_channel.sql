-- Optional tag on journal lines: how income was collected (cash / POS / Benefit Pay).
ALTER TABLE journal_lines
  ADD COLUMN IF NOT EXISTS income_channel VARCHAR(30) NULL;

COMMENT ON COLUMN journal_lines.income_channel IS 'cash_receipt | pos | benefit_pay — revenue lines only; used for income & expense by channel';
