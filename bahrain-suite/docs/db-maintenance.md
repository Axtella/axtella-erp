# PostgreSQL maintenance — space and duplicates

This project’s API stores **relational business data** only (see [apps/backend/src/database/migrations/](../apps/backend/src/database/migrations/)). There are **no** tables for OS crash dumps or uploaded file blobs; exports (PDF/XLSX) are generated in memory and streamed to clients.

Use this guide to **back up**, **measure** size, **reclaim bloat** with `VACUUM`, and **find duplicate rows** safely.

## Before you change data

1. Run a backup (see below).
2. Prefer changes on a **staging** copy of the database first.

## 0. Quick connection check

From `apps/backend` (requires `.env` and `psql` on `PATH`):

```bash
npm run db:check
```

Exits **0** only if `SELECT 1` succeeds with your current `DB_*` settings.

## 1. Backup (`pg_dump`)

From `apps/backend` with a configured `.env` (same `DB_*` as Nest):

```bash
bash scripts/db-backup.sh
```

Writes a gzipped SQL dump under `apps/backend/backups/` by default, or pass another directory:

```bash
bash scripts/db-backup.sh /path/to/safe/storage
```

Requires `pg_dump` and `gzip` on your `PATH` (PostgreSQL client tools).

Restore example (plain SQL inside gzip):

```bash
gunzip -c backups/bahrain_properties_YYYYMMDD_HHMMSS.sql.gz | psql -h ... -U ... -d ...
```

## 2. Measure size and dead tuples

Connect with `psql` to your database, then run:

```bash
psql -h "$DB_HOST" -p "$DB_PORT" -U "$DB_USERNAME" -d "$DB_NAME" -f sql/maintenance/01_table_sizes.sql
```

Or paste the contents of [apps/backend/sql/maintenance/01_table_sizes.sql](../apps/backend/sql/maintenance/01_table_sizes.sql).

## 3. Reclaim space (bloat)

Run [apps/backend/sql/maintenance/02_vacuum.sql](../apps/backend/sql/maintenance/02_vacuum.sql) in `psql`, or:

```sql
VACUUM (ANALYZE);
```

Use **`VACUUM FULL`** on specific large tables **only after backup**; it locks the table and rewrites it.

## 4. Find duplicate rows

Run the **SELECT** queries in [apps/backend/sql/maintenance/03_duplicate_finders.sql](../apps/backend/sql/maintenance/03_duplicate_finders.sql). They do not delete anything.

Removing duplicates requires **your** business rule (which row to keep) and **foreign-key updates** before `DELETE`. Comments at the bottom of that file outline the pattern. Wrong deletes can break referential integrity.

## 5. Optional: prevent future duplicates

Add `UNIQUE` constraints or partial indexes in a **new migration** (product decision), e.g. `UNIQUE (property_id, unit_no)` on `units` or `UNIQUE` on `tenants(email)` where email is not null.

## See also

- [docs/RUNBOOK.md](./RUNBOOK.md) — environment, health checks, and login.
