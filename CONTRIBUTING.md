# Contributing

## GitHub repository settings (owner / admin)

Apply these in the repo on GitHub: **https://github.com/Axtella/axtella-erp**

### Description and topics

Suggested **description**:

`Monorepo: Bahrain suite (NestJS, Next.js, Expo) and Axtella ZATCA NestJS scaffold.`

Suggested **topics**: `nestjs`, `nextjs`, `expo`, `typescript`, `postgresql`, `erp`, `bahrain`

Set under **Settings → General** (description and topics).

### Collaborators

1. Open **Settings → Collaborators** (or **Manage access**).
2. **Add people** by GitHub username and choose a role (**Write** for developers, **Maintain** or **Admin** only when needed).

### Branch protection for `main`

When the team uses pull requests, enable under **Settings → Branches → Branch protection rules**:

- **Branch name pattern:** `main`
- Enable **Require a pull request before merging** (optional: require approvals).
- Enable **Require status checks to pass before merging** after CI is stable, and select the workflow job (e.g. `build`).
- Consider **Do not allow bypassing the above settings** for everyone except admins.

### Merge strategy

Pick one default for the repo under **Settings → General → Pull Requests** (e.g. **Squash and merge** for a linear history). Document the choice for your team if it differs from the default.

### Pushing GitHub Actions workflows

GitHub rejects pushes that add or change files under `.github/workflows/` unless the credential has the **`workflow` scope** (for classic PATs) or equivalent permissions (fine-grained token: **Actions** read/write on the repository). If `git push` fails with a message about workflow scope, use one of these:

1. **Classic PAT:** enable **`repo`** and **`workflow`**, update macOS Keychain (remove old `github.com` entry) or run `gh auth login`, then `git push origin main`.
2. **Fine-grained PAT:** repository `Axtella/axtella-erp` with **Contents** and **Actions** set to **Read and write**.
3. **Web UI:** add file `.github/workflows/ci.yml` on github.com (paste from [`scripts/ci-workflow.yml`](scripts/ci-workflow.yml)).
4. **API script (no `git push` of workflow files):** from the repo root, with a token as above:

   ```bash
   export GITHUB_TOKEN="your_pat_here"
   python3 scripts/publish_workflow_to_github.py
   git fetch origin && git reset --hard origin/main
   ```

   The workflow YAML lives in [`scripts/ci-workflow.yml`](scripts/ci-workflow.yml) so normal `git push` does not touch `.github/workflows/` until the file exists on GitHub.

Check whether Actions workflows are visible on the repo (no token):

```bash
python3 scripts/publish_workflow_to_github.py --check
```
