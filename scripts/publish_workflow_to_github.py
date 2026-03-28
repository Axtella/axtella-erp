#!/usr/bin/env python3
"""
Upload CI workflow to GitHub via REST API.

Use when `git push` fails with "without `workflow` scope": a classic PAT used
for HTTPS often has `repo` but not `workflow`. This script uses a token with
Contents + Actions write (fine-grained) or classic `repo` + `workflow`.

Uses `curl` for HTTPS (avoids broken Python SSL trust stores on some Macs).

After success, run: git fetch origin && git reset --hard origin/main
"""

from __future__ import annotations

import argparse
import base64
import json
import os
import subprocess
import sys

REPO = "Axtella/axtella-erp"
TARGET_PATH = ".github/workflows/ci.yml"
BRANCH = "main"
API_VERSION = "2022-11-28"


def _curl_json(method: str, url: str, token: str | None, data: dict | None = None) -> tuple[int, dict]:
    cmd = [
        "curl",
        "-sS",
        "-w",
        "%{http_code}",
        "-X",
        method,
        url,
        "-H",
        f"Accept: application/vnd.github+json",
        "-H",
        f"X-GitHub-Api-Version: {API_VERSION}",
        "-H",
        "User-Agent: axtella-publish-workflow-script",
    ]
    if token:
        cmd.extend(["-H", f"Authorization: Bearer {token}"])
    out_suffix = b""
    if data is not None:
        payload = json.dumps(data).encode("utf-8")
        cmd.extend(["-H", "Content-Type: application/json", "--data-binary", "@-"])
        proc = subprocess.Popen(cmd, stdin=subprocess.PIPE, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
        raw, err = proc.communicate(payload)
        if proc.returncode != 0:
            raise RuntimeError(err.decode() or f"curl exit {proc.returncode}")
    else:
        proc = subprocess.run(cmd, capture_output=True)
        raw = proc.stdout
        if proc.returncode != 0:
            raise RuntimeError(proc.stderr.decode() or f"curl exit {proc.returncode}")

    if len(raw) < 3:
        return 0, {"message": "empty response"}
    try:
        status = int(raw[-3:].decode("ascii"))
    except ValueError:
        status = 0
    body = raw[:-3].decode("utf-8", errors="replace").strip()
    if not body:
        return status, {}
    try:
        return status, json.loads(body)
    except json.JSONDecodeError:
        return status, {"message": body}


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
        try:
            status, data = _curl_json("GET", url, None)
        except (RuntimeError, FileNotFoundError) as e:
            print(e, file=sys.stderr)
            return 1
        if status != 200:
            print(f"HTTP {status}: {data}", file=sys.stderr)
            return 1
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
    try:
        status, body = _curl_json("GET", get_url, token)
    except (RuntimeError, FileNotFoundError) as e:
        print(e, file=sys.stderr)
        return 1

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
    try:
        st, out = _curl_json("PUT", put_url, token, payload)
    except (RuntimeError, FileNotFoundError) as e:
        print(e, file=sys.stderr)
        return 1

    if st not in (200, 201):
        print(f"PUT failed {st}: {out}", file=sys.stderr)
        return 1

    commit = out.get("commit", {}).get("sha", "?")
    print(f"Uploaded {TARGET_PATH} (commit {commit})")
    print("Sync local clone: git fetch origin && git reset --hard origin/main")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
