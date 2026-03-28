-- Size of current database (bytes)
SELECT pg_size_pretty(pg_database_size(current_database())) AS database_size;

-- Largest relations: table + indexes + TOAST
SELECT
  n.nspname AS schema,
  c.relname AS relation,
  CASE c.relkind
    WHEN 'r' THEN 'table'
    WHEN 'i' THEN 'index'
    WHEN 't' THEN 'toast'
    WHEN 'S' THEN 'sequence'
    ELSE c.relkind::text
  END AS kind,
  pg_size_pretty(pg_total_relation_size(c.oid)) AS total_size,
  pg_total_relation_size(c.oid) AS total_bytes
FROM pg_class c
JOIN pg_namespace n ON n.oid = c.relnamespace
WHERE n.nspname = 'public'
  AND c.relkind IN ('r', 'i')
ORDER BY pg_total_relation_size(c.oid) DESC
LIMIT 40;

-- Heap bloat signal (live vs dead rows); high n_dead_tup → run VACUUM
SELECT
  relname,
  n_live_tup,
  n_dead_tup,
  last_vacuum,
  last_autovacuum
FROM pg_stat_user_tables
ORDER BY n_dead_tup DESC
LIMIT 30;
