-- Optional local/dev admin (apply after create-users-table.sql).
-- Plain password: AxtellaDev2024!  (bcrypt 10 rounds, same as AuthService.register)
-- Login: dev@example.com / AxtellaDev2024!
INSERT INTO users (email, password_hash, role, is_active)
VALUES (
  'dev@example.com',
  '$2b$10$BbeswDzcrBsbsXGceWXgK.AQIuGKSf2VBUZ2eXwBFnpnUhVwKF07S',
  'admin',
  true
)
ON CONFLICT (email) DO UPDATE SET
  password_hash = EXCLUDED.password_hash,
  role = EXCLUDED.role,
  is_active = EXCLUDED.is_active,
  updated_at = now();
