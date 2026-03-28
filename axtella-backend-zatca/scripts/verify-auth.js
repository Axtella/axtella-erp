const baseUrl = process.env.AUTH_BASE_URL || "http://127.0.0.1:3010";
const email = process.env.AUTH_TEST_EMAIL || process.env.AUTH_ADMIN_EMAIL || "admin@axtella.local";
const password = process.env.AUTH_TEST_PASSWORD || process.env.AUTH_ADMIN_PASSWORD || "ChangeMe123!";

async function run() {
  const loginRes = await fetch(`${baseUrl}/api/v1/auth/login`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!loginRes.ok) {
    throw new Error(`login failed: ${loginRes.status} ${await loginRes.text()}`);
  }

  const login = await loginRes.json();
  if (!login.access_token) {
    throw new Error("login response missing access_token");
  }

  const meRes = await fetch(`${baseUrl}/api/v1/auth/me`, {
    headers: { authorization: `Bearer ${login.access_token}` },
  });

  if (!meRes.ok) {
    throw new Error(`me failed: ${meRes.status} ${await meRes.text()}`);
  }

  const me = await meRes.json();
  if (!me.email) {
    throw new Error("me response missing email");
  }

  console.log(`Axtella auth verification passed for ${me.email}`);
}

run().catch((err) => {
  console.error(err.message);
  process.exit(1);
});
