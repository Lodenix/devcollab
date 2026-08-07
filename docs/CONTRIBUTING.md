# Contributing to DevCollab

Welcome. This doc explains how we work together on this project. Read it once properly, then keep it open the first few times you do a PR.

## Branch Structure

- `main`: the stable branch, only updated from `dev` periodically
- `dev`: where all feature work gets merged first
- `feature/*`: where you actually build things

You never push directly to `main` or `dev`. Everything goes through a Pull Request (PR).


## Branch Naming

Use this pattern for every branch:

```
feature/short-description
```

Everything lowercase, words separated by hyphens. No spaces, no capital letters, no underscores.

### Prefixes

- `feature/` for new features or issue work, this is what we use for almost everything in Phase 1
- `fix/` for bug fixes once we have things running
- `chore/` for small non-code housekeeping, like updating docs or config

### The description part

Keep it short and tied to what the branch actually does, not the issue number alone. Numbers mean nothing when scanning a branch list without also opening GitHub.

Examples:

- `feature/register-endpoint`
- `feature/register-form`
- `feature/login-endpoint`
- `feature/auth-middleware`
- `feature/messages-schema`
- `feature/chat-ui`

### One branch or two per feature

If FE and BE are building separable pieces of the same feature, like a register endpoint and a register form, use two different branches and two different PRs, even if the same two people are paired on the issue. This keeps each PR small and reviewable on its own, and means one half is not stuck waiting on the other to be mergeable.

Only share a single branch when two people are genuinely editing the same piece of work together at the same time.

## The Basic Flow

1. Check the Issues tab, find your assigned issue
2. Pull the latest `dev` and create your branch:

```bash
git checkout dev
git pull
git checkout -b feature/short-name
```

3. If you are paired FE and BE on the same feature, agree on the API contract before writing code (see below)
4. Build your part, commit often, push regularly:

```bash
git add .
git commit -m "clear message about what you did"
git push origin feature/short-name
```

5. When ready, open a PR into `dev`. Link the issue it closes, tag a teammate to review
6. Wait for CI to pass and get at least 1 approval
7. Merge, then delete the branch

## Agreeing on the API Contract First

Before FE and BE start coding, spend 10 minutes agreeing on and writing down, as a comment on the issue:

- The endpoint and method, for example `POST /api/auth/login`
- What the request body looks like
- What a successful response looks like
- What an error response looks like

Once this is written down, FE and BE can work at the same time without waiting on each other. FE can build against a fake version of the response, then swap it for the real endpoint once BE is done.

## Commits and PRs

- Commit often, in small pieces, not one giant commit at the end
- Write commit messages that explain what changed, not just "update" or "fix"
- Every PR should link to the issue it closes
- Every PR needs at least 1 review before merging
- If review comments ask for changes, push new commits to the same branch, do not open a new PR

## Team Rules

- If you take an issue, either finish it or say clearly that you are stuck
- If you are stuck for more than 30 to 60 minutes, say so in the group chat. Do not sit quietly stuck
- Stay responsive. A short "on it" or "will look after work" is enough
- Ask questions early, before you have built the wrong thing

## When You Are Stuck on Git

- Merge conflicts happen, they are normal, not a failure
- If unsure, do not force push, ask in the group chat first
- `git status` tells you what state you are in, use it often

## This Document Will Change

This is a first version. After Phase 1 is done we will do a retro and update this doc based on what actually confused us or slowed us down.
