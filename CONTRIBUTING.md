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

GitHub rejects pushes that add or change files under `.github/workflows/` unless the credential has the **`workflow` scope** (for classic PATs) or equivalent permissions (fine-grained token: **Actions** read/write on the repository). If `git push` fails with a message about workflow scope, create a new token with that scope or paste the workflow YAML in the GitHub web UI under **Actions → New workflow**.
