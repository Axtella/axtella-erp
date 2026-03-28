-- READ-ONLY helpers: find candidate duplicate rows. This app has no "file" blobs in Postgres;
-- duplicates are usually repeated business rows where UNIQUE was not enforced.

-- --- Tenants: same email (adjust if you use CPR as natural key) ---
SELECT lower(trim(email)) AS email_norm, count(*) AS cnt, array_agg(id ORDER BY created_at) AS ids
FROM tenants
WHERE email IS NOT NULL AND trim(email) <> ''
GROUP BY lower(trim(email))
HAVING count(*) > 1;

SELECT cpr_no, count(*) AS cnt, array_agg(id ORDER BY created_at) AS ids
FROM tenants
WHERE cpr_no IS NOT NULL AND trim(cpr_no) <> ''
GROUP BY cpr_no
HAVING count(*) > 1;

-- --- Units: same property + unit number ---
SELECT property_id, unit_no, count(*) AS cnt, array_agg(id ORDER BY created_at) AS ids
FROM units
GROUP BY property_id, unit_no
HAVING count(*) > 1;

-- --- Journal entries: duplicate journal_no (should be impossible if UNIQUE enforced) ---
SELECT journal_no, count(*) AS cnt, array_agg(id) AS ids
FROM journal_entries
GROUP BY journal_no
HAVING count(*) > 1;

-- --- Bookings: identical unit + same check-in instant (example heuristic; tune to your rules) ---
SELECT unit_id, check_in_date, count(*) AS cnt, array_agg(id ORDER BY created_at) AS ids
FROM bookings
GROUP BY unit_id, check_in_date
HAVING count(*) > 1;

/*
  REMOVING DUPLICATES (manual, per case — do NOT run blindly):

  1) Pick a keeper id per group (e.g. min(created_at)).
  2) Point foreign keys at the keeper before deleting duplicates.
     Example for tenants: bookings.tenant_id references tenants(id).
       UPDATE bookings SET tenant_id = '<keeper_uuid>'
       WHERE tenant_id IN ('<dup1>', '<dup2>');
  3) Delete extras in a transaction:
       DELETE FROM tenants WHERE id IN ('<dup1>', '<dup2>');
  4) journal_lines reference journal_entries — merge or delete lines on duplicate
     headers before deleting duplicate journal_entries.

  If unsure, restore from backup and ask a DBA.
*/
