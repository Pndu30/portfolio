# portfolio

Pandu Raditya Rohman's portfolio. Built with Astro, deployed on Vercel.

## Develop

```bash
corepack enable pnpm
pnpm install
pnpm dev          # http://localhost:4321
pnpm build        # type-check + production build (same as CI and Vercel)
```

## Update the site

| What | Where |
| --- | --- |
| Name, bio, contacts, resume | `src/data/user.json` |
| Resume PDF (download button) | `public/resume.pdf` |
| Profile photo | `src/assets/me.jpg` |
| Projects | `src/content/projects/*.md` (copy `_example-project.md`) |
| Project photos / videos | `public/media/<project>/`, listed under `media:` in the project's frontmatter |

## Deploy

- **Push to `main`** → GitHub Actions type-checks and builds, and Vercel deploys to production.
- **Push any other branch / open a PR** → Vercel builds a preview deployment and links it on the PR.
- If the build fails, nothing is deployed; the last good version stays live.

```bash
git switch -c update-projects   # optional: preview first
git add -A && git commit -m "..."
git push                         # main → live in about a minute
```
