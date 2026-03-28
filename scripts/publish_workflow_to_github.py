#!/usr/bin/env python3
"""
Upload CI workflow to GitHub via REST API.

Use when `git push` fails with "without `workflow` scope": a classic PAT used
for HTTPS often has `repo` but not `workflow`. This script uses a token with
Contents + Actions write (fine-grained) or classic `repo` + `workflow`.

After success, run: git fetch origin && git reset --hard origin/main
"""

from __future__ import annotations

import argparse
import base64
import json
import os
import sys
import urllib.error
import urllib.request

REPO = "Axtella/axtella-erp"
TARGET_PATH = ".github/workflows/ci.yml"
BRANCH = "main"
API_VERSION = "2022-11-28"


def _request(method: str, url: str, token: str, data: bytes | None = None) -> tuple[int, dict]:
    req = urllib.request.Request(
        url,
        data=data,
        method=method,
        headers={
            "Authorization": f"Bearer {token}",
            "Accept": "application/vnd.github+json",
            "X-GitHub-Api-Version": API_VERSION,
            "User-Agent": "axtella-publish-workflow-script",
            **({"Content-Type": "application/json"} if data else {}),
        },
    )
    try:
        with urllib.request.urlopen(req) as resp:
            body = resp.read().decode()
            return resp.status, json.loads(body) if body else {}
    except urllib.error.HTTPError as e:
        err = e.read().decode()
        try:
            parsed = json.loads(err)
        except json.JSONDecodeError:
            parsed = {"message": err}
        return e.code, parsed


def main() -> int:
    parser = argparse.ArgumentParser(description="Publish GitHub Actions workflow via API.")
    parser.add_argument(
        "--check",
        action="store_true",
        help="Only list workflows on the repo (public API, no token).",
    )
    args = parser.parse_args()

    if args.check:
        url = f"https://api.github.com/repos/{REPO}/actions/workflows"
        req = urllib.request.Request(
            url,
            headers={"Accept": "application/vnd.github+json", "User-Agent": "axtella-publish-workflow-script"},
        )
        with urllib.request.urlopen(req) as resp:
            data = json.load(resp)
        names = [w["name"] for w in data.get("workflows", [])]
        print(f"Workflows on {REPO}: {data.get('total_count', 0)}", names)
        return 0

    token = os.environ.get("GITHUB_TOKEN", "").strip()
    if not token:
        print(
            "Set GITHUB_TOKEN to a PAT with permission to update repository contents and workflows:\n"
            "  Classic: scopes `repo` and `workflow`\n"
            "  Fine-grained: Contents Read/Write + Actions Read/Write on this repo",
            file=sys.stderr,
        )
        return 1

    root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    source = os.path.join(root, "scripts", "ci-workflow.yml")
    if not os.path.isfile(source):
        print(f"Missing {source}", file=sys.stderr)
        return 1

    content_b64 = base64.b64encode(open(source, "rb").read()).decode("ascii")
    get_url = f"https://api.github.com/repos/{REPO}/contents/{TARGET_PATH}?ref={BRANCH}"
    status, body = _request("GET", get_url, token)
    sha = None
    if status == 200:
        sha = body.get("sha")
    elif status != 404:
        print(f"GET {TARGET_PATH}: {status} {body}", file=sys.stderr)
        return 1

    payload: dict = {
        "message": "Add GitHub Actions CI workflow" if sha is None else "Update GitHub Actions CI workflow",
        "content": content_b64,
        "branch": BRANCH,
    }
    if sha:
        payload["sha"] = sha

    put_url = f"https://api.github.com/repos/{REPO}/contents/{TARGET_PATH}"
    st, out = _request("PUT", put_url, token, json.dumps(payload).encode("utf-8"))
    if st not in (200, 201):
        print(f"PUT failed {st}: {out}", file=sys.stderr)
        return 1

    commit = out.get("commit", {}).get("sha", "?")
    print(f"Uploaded {TARGET_PATH} (commit {commit})")
    print("Sync local clone: git fetch origin && git reset --hard origin/main")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
