/**
 * Matches [008_seed_dev_user.sql](../../backend/src/database/migrations/008_seed_dev_user.sql).
 * Shown on `/login` in `next dev` by default, or when `NEXT_PUBLIC_SHOW_DEV_LOGIN_HINT=1`.
 * Hide in dev with `NEXT_PUBLIC_HIDE_DEV_LOGIN_HINT=1`.
 */
export const DEV_SEED_CREDENTIALS = {
  email: 'dev@example.com',
  password: 'AxtellaDev2024!',
} as const;
