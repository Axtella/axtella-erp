# Security

## If a token or password was exposed

1. In GitHub: **Settings → Developer settings → Personal access tokens** — revoke any token that was shared or checked into code.
2. Change your GitHub account password if it may have been exposed.
3. Confirm this repo’s remote has no credentials in the URL:

   ```bash
   git remote -v
   ```

   You should see `https://github.com/Axtella/axtella-erp.git` (no `user:token@`).

## Recommended authentication for Git

- **GitHub CLI:** `gh auth login`
- **HTTPS on macOS:** `git config --global credential.helper osxkeychain` (then push once and sign in when prompted; use a **Personal Access Token** as the password, not your GitHub account password).

## Secrets in this project

- Do not commit `.env` files. Use each app’s `.env.example` as a template only.
- If `.env.local` or any real env file was ever pushed to GitHub, treat those values as **compromised**: rotate every secret that appeared in that file (API keys, database URLs, etc.), even after the file is removed from the latest commit.
