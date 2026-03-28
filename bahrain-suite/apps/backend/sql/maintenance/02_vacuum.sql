-- Reclaim dead tuple space and refresh planner stats.
-- Run during low traffic. Cannot run inside a transaction block in some clients — execute as single statements.

VACUUM (ANALYZE);

-- Optional: one busy table (uncomment and repeat as needed)
-- VACUUM (ANALYZE) journal_lines;
-- VACUUM (ANALYZE) journal_entries;

-- Maximum shrink (exclusive lock, longer rewrite). BACK UP FIRST (scripts/db-backup.sh).
-- Only on specific large tables; avoid on tiny tables during peak hours.
-- VACUUM FULL journal_lines;
-- VACUUM FULL journal_entries;
