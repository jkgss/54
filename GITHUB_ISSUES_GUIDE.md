# GitHub Issues Guide (AI Dev Agents)

**Repository:** `jkgss/54`  
**Read this at the start of every chat.** Follow it for every task you implement, fix, or plan.

This file is the single source of truth for how we track work. Discipline is mandatory: **no meaningful work without a linked GitHub issue.**

---

## 1. Goals

1. Every change is traceable to an issue.
2. Issue status matches reality (open / in progress / done).
3. Milestones stay current so progress is visible without asking.
4. Agents create or update issues **as they go**, not only at the end.

---

## 2. Hard Rules

| Rule | Detail |
|------|--------|
| No orphan work | Do not start coding, refactoring, or deploying until an issue exists (or an existing one is claimed). |
| Search first | Before creating an issue, search open (and recently closed) issues for duplicates. |
| One primary issue per task | Prefer one issue per deliverable. Split only when work is independently shippable. |
| Link everything | Commits and PRs must reference the issue (`#N`). Closing PRs use `Closes #N` / `Fixes #N`. |
| Update as you go | Comment on the issue when scope changes, blockers appear, or a milestone chunk is done. |
| Close only when done | Close only after the Definition of Done is met. Do not close “for later.” |
| Prefer CLI / API | Prefer `gh` (or the GitHub MCP) over asking the user to click around the UI. |

---

## 3. Session Workflow (Do This Every Chat)

### A. Start of session

1. Confirm repo: `jkgss/54`, current branch, and whether work targets `main` or a feature branch.
2. List active milestones and open issues:
   ```bash
   gh milestone list
   gh issue list --state open --limit 30
   ```
3. Match the user’s request to an existing issue, **or** create one (see §4).
4. Assign the issue to the correct milestone and labels.
5. Comment once: what you will do in this session (1–3 bullets).

### B. During implementation

1. Keep the issue’s checklist updated (check items off via comments or issue body edits).
2. If scope grows, either:
   - add checklist items to the same issue, or
   - open a follow-up issue and link it (`Related to #N` / `Blocked by #N`).
3. If blocked, comment with the blocker and stop inventing workarounds without noting them on the issue.
4. Every commit message should include `#N` (e.g. `Fix mobile hero overflow (#42)`).

### C. End of session / when shipping

1. Summarize results in an issue comment (what shipped, what remains).
2. If fully done: ensure PR/commit uses `Closes #N`, then verify the issue is closed.
3. If partially done: leave the issue open, update the checklist, and note next steps.
4. Re-check the milestone: close or retarget issues so the milestone % is accurate.

---

## 4. Creating Issues

### When to create

Create a new issue when:
- The user asks for a new feature, fix, or refactor with no matching open issue.
- You discover a defect while working on something else (file a separate bug issue).
- Planned work is large enough to need its own milestone tracking.

Do **not** create an issue for pure Q&A, one-line typos you fix immediately *only if* the user explicitly says not to track it—and even then, prefer a tiny docs/chore issue if it touches the repo.

### Title format

Use conventional, action-oriented titles:

```text
feat: <what>
fix: <what>
docs: <what>
refactor: <what>
chore: <what>
ui: <what>
```

Examples:
- `feat: add operator login drawer on mobile`
- `fix: prevent horizontal shift on iOS zoom`
- `chore: remove dead Stripe checkout routes`

### Body template (required)

```markdown
## Overview
<1–3 sentences: what and why>

## Scope
- In:
- Out:

## Tasks
- [ ] …
- [ ] …

## Acceptance criteria / Definition of Done
- [ ] Behavior verified on desktop and mobile (<768px) where UI is involved
- [ ] No new backend coupling unless this issue explicitly adds it
- [ ] Linked commit/PR references this issue
- [ ] Milestone updated if this completes a phase item

## Notes
- Branch (if known):
- Related issues:
```

### Labels

Use these labels (create them on the repo if missing):

| Label | Use for |
|-------|---------|
| `feat` | New capability |
| `bug` | Broken behavior |
| `docs` | Documentation only |
| `refactor` | Internal change, same behavior |
| `ui` | Layout, styling, responsive polish |
| `chore` | Tooling, deps, cleanup, deploy hygiene |
| `backend` | APIs, DB, auth, webhooks, payments |
| `frontend` | Landing/UI-only work |
| `blocked` | Waiting on decision or dependency |
| `urgent` | Do next |

### Milestones

- Every issue **must** have a milestone (or explicitly `no milestone` only if the user says it is backlog noise—and then still prefer a “Backlog” milestone).
- When starting a new phase (e.g. rebuild backend), create a milestone first, then attach issues.
- Keep milestone description short: goal + exit criteria.
- Do not leave completed work open just to “fill” a milestone—close issues so % complete is real.

Suggested milestone naming:

```text
M0 – Flat frontend baseline
M1 – Backend foundation
M2 – Auth & roles
M3 – Payments / webhooks
M4 – Ops & polish
```

Adjust names to match the current plan; do not invent parallel milestone systems.

### Example `gh` commands

```bash
# Create
gh issue create \
  --title "feat: rebuild auth with Supabase" \
  --label "feat,backend" \
  --milestone "M1 – Backend foundation" \
  --body "$(cat <<'EOF'
## Overview
...
EOF
)"

# Comment progress
gh issue comment 42 --body "In progress: StickyNav done. Next: DiagnosisForm."

# Close when done (prefer Closes #N on PR; manual close if needed)
gh issue close 42 --comment "Shipped on main. Verified mobile + desktop."
```

---

## 5. Updating Existing Issues

Update (do not duplicate) when:
- Continuing prior work in a new chat.
- The user asks to change direction on an open task.
- You finish part of a checklist.

Always:
1. Comment with status.
2. Edit body checklists if needed.
3. Retarget milestone/labels if the nature of the work changed.
4. Add `blocked` label + comment if waiting.

---

## 6. Commits, Branches, PRs

1. Branch names: prefer `cursor/<short-description>` or `feat/<short-description>`.
2. Commit messages: concise, why-focused, include `#N`.
3. PR body must include:
   - Summary (bullets)
   - `Closes #N` (or `Fixes #N` for bugs)
   - Test plan checklist
4. Do not merge/push to `main` or deploy production unless the user explicitly asks.

---

## 7. Project State (Keep This Accurate)

Current product direction (update this section when it changes):

- **Now:** Pure frontend landing page (no live Supabase / Stripe / API coupling in `src/`).
- **Next:** Rebuild backend deliberately behind milestones; do not silently reintroduce old backend paths.
- **Production / default branch:** Prefer shipping via `main` only when requested.

When agents finish a milestone-level chunk, update this section in a docs PR or comment on the milestone so the next chat inherits truth.

---

## 8. Minimal Agent Checklist (Copy Into Your Plan)

```text
[ ] Searched existing issues
[ ] Created or claimed issue #N
[ ] Labels + milestone set
[ ] Session-start comment posted
[ ] Commits reference #N
[ ] Progress comments as needed
[ ] DoD met before close / Closes #N on PR
[ ] Milestone progress still accurate
```

---

## 9. Anti-Patterns

- Coding first, filing an issue after the fact with no checklist.
- Mega-issues that mix frontend polish + backend redesign with no split.
- Closing issues that still have unchecked DoD items.
- Leaving milestones full of stale open issues that were already shipped.
- Creating a second issue for the same work because the first was not found.

---

**Remember:** Issues are how we stay aligned across chats. If it is not on GitHub, it did not officially happen.
