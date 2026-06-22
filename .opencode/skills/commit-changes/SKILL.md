---
name: commit-changes
description: Stage changes and commit with a conventional commit message, running lint before committing
---

## 1. Purpose

Ensure all commits are:
- Clear and readable
- Consistent across the project
- Easy to track and review
- Structured for automated changelogs
- Following conventional commit standards

## 2. Commit Message Format

```
<type>(<scope>): <short summary>
```

**Examples:**
- `feat(auth): add login validation for JWT tokens`
- `fix(ui): correct button alignment in navbar`
- `refactor(api): simplify user service logic`

## 3. Commit Types

| Type       | Description |
|------------|-------------|
| feat       | New feature or functionality |
| fix        | Bug fix |
| refactor   | Code changes that do not add features or fix bugs |
| perf       | Performance improvements |
| style      | Code style changes (formatting, whitespace, etc.) |
| test       | Adding or updating tests |
| docs       | Documentation changes |
| build      | Build system or dependency changes |
| ci         | CI/CD pipeline changes |
| chore      | Maintenance tasks |

## 4. Scope Rules

Scope defines where the change happened. Examples: `auth`, `ui`, `api`, `database`, `dashboard`, `config`. If scope is unclear, omit it.

## 5. Commit Message Guidelines

**DO:**
- Use imperative tone ("add", not "added")
- Keep subject line under 72 characters
- Be specific and meaningful
- Focus on what changed and why

**DON'T:**
- Write vague messages like "update code"
- Include unrelated changes in one commit
- Use past tense ("fixed", "added")

## 6. Commit Granularity

Each commit represents one logical change.

**Good:**
- `feat(auth): add password reset endpoint`
- `feat(auth): add email verification flow`

**Bad:**
- `feat(auth): add reset + verify + login fixes + UI updates`

## 7. Agent Behavior

1. Analyze staged changes
2. Group changes by logical feature or fix
3. Determine appropriate commit type
4. Generate a concise commit message
5. Ensure consistency with project history
6. Avoid mixing unrelated changes

## 8. Example Workflow

**Input:** Modified login validation, Fixed navbar alignment, Updated API error handling

**Output:**
- `fix(auth): improve login validation handling`
- `fix(ui): correct navbar alignment issue`
- `fix(api): standardize error response format`

## 9. Extended Format (optional body)

For complex commits, include a body:

```
feat(api): add rate limiting middleware

Implements request throttling to prevent API abuse.
Uses token bucket algorithm with Redis storage.
```

## 10. Best Practices

- Keep commits atomic
- Prefer multiple small commits over one large commit
- Always review diff before committing
- Ensure commit message matches actual code changes

## 11. Last Resort

If semantic meaning cannot be determined, default to:

```
chore: update project files
```

## 12. Pre-commit Requirements

- Run `pnpm lint` and fix any errors before committing
- Review `git diff --cached` to confirm staged content
- Never force-push, amend, or use interactive mode unless explicitly asked
