---
plan: 01
title: Infrastructure — Unsplash image config and sections directory
wave: 1
depends_on: []
autonomous: true
requirements_addressed: []
files_modified:
  - next.config.mjs
  - components/sections/.gitkeep
---

# Plan 01: Infrastructure — Unsplash image config and sections directory

## Objective

Unblock every subsequent Phase 2 plan by (1) configuring `next/image` to allow external `images.unsplash.com` URLs through `remotePatterns` and (2) creating the `components/sections/` directory that will host all four new section components. Without these two steps, the Hero and Gallery plans crash the dev server with `hostname "images.unsplash.com" is not configured`, and component imports fail with missing-directory errors. This plan addresses no functional requirement on its own — it is a pure blocker fix.

## Tasks

<task id="T01-01">
<title>Add Unsplash remotePatterns to next.config.mjs</title>
<read_first>
- /Users/BlairDalziel/Documents/Claude/elevated-apartment-locating/next.config.mjs
- /Users/BlairDalziel/Documents/Claude/elevated-apartment-locating/.planning/phases/02-content-sections/02-RESEARCH.md
- /Users/BlairDalziel/Documents/Claude/elevated-apartment-locating/.planning/phases/02-content-sections/02-UI-SPEC.md
</read_first>
<action>
Replace the entire contents of `/Users/BlairDalziel/Documents/Claude/elevated-apartment-locating/next.config.mjs` with the following. This switches the config from an empty object to one that whitelists `images.unsplash.com` for `next/image`. The modern `remotePatterns` API (Next.js 13.4+) is required — the deprecated `domains` array must NOT be used.

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
```

Key decisions:
- `remotePatterns` (not `domains`) — current Next.js 14 API, no deprecation warning
- `pathname: '/**'` allows any path under the Unsplash CDN
- `protocol: 'https'` — Unsplash serves over HTTPS exclusively
- File ends with `export default nextConfig;` matching existing module syntax
</action>
<acceptance_criteria>
- File `/Users/BlairDalziel/Documents/Claude/elevated-apartment-locating/next.config.mjs` exists
- `next.config.mjs` contains the literal string `remotePatterns`
- `next.config.mjs` contains the literal string `images.unsplash.com`
- `next.config.mjs` contains the literal string `pathname: '/**'`
- `next.config.mjs` contains the literal string `protocol: 'https'`
- `next.config.mjs` does NOT contain the deprecated `domains:` array
- `next.config.mjs` ends with `export default nextConfig;`
- Running `npx tsc --noEmit` from project root exits with code 0
</acceptance_criteria>
</task>

<task id="T01-02">
<title>Create components/sections/ directory</title>
<read_first>
- /Users/BlairDalziel/Documents/Claude/elevated-apartment-locating/.planning/phases/02-content-sections/02-RESEARCH.md
- /Users/BlairDalziel/Documents/Claude/elevated-apartment-locating/.planning/phases/02-content-sections/02-CONTEXT.md
</read_first>
<action>
Create the directory `/Users/BlairDalziel/Documents/Claude/elevated-apartment-locating/components/sections/` by creating a `.gitkeep` placeholder file inside it. This ensures the directory exists in git (empty directories are not tracked) and is available as the target for the Hero, Gallery, HowItWorks, and OurStory components created in later plans.

Create file `/Users/BlairDalziel/Documents/Claude/elevated-apartment-locating/components/sections/.gitkeep` with completely empty content (zero bytes). The file acts purely as a git placeholder; subsequent plans will populate the directory with `.tsx` component files and this `.gitkeep` can remain or be deleted later (non-blocking either way).

Shell-equivalent (for reference only — executor uses the Write tool):
```bash
mkdir -p /Users/BlairDalziel/Documents/Claude/elevated-apartment-locating/components/sections
touch /Users/BlairDalziel/Documents/Claude/elevated-apartment-locating/components/sections/.gitkeep
```
</action>
<acceptance_criteria>
- Directory `/Users/BlairDalziel/Documents/Claude/elevated-apartment-locating/components/sections/` exists
- File `/Users/BlairDalziel/Documents/Claude/elevated-apartment-locating/components/sections/.gitkeep` exists
- Running `ls components/sections/` from project root does not error
</acceptance_criteria>
</task>

<task id="T01-03">
<title>Verify dev server and TypeScript still clean</title>
<read_first>
- /Users/BlairDalziel/Documents/Claude/elevated-apartment-locating/next.config.mjs
</read_first>
<action>
From the project root, run the TypeScript compiler and a production build to confirm the new `next.config.mjs` is syntactically valid and Next.js accepts it.

```bash
cd /Users/BlairDalziel/Documents/Claude/elevated-apartment-locating
npx tsc --noEmit
npm run build
```

Both commands must exit with code 0. No source file edits are made in this task — it is verification only. If `npm run build` fails with a config-parsing error, re-check `next.config.mjs` for syntax issues (missing comma, missing semicolon on `export default`).
</action>
<acceptance_criteria>
- `npx tsc --noEmit` exits with code 0
- `npm run build` exits with code 0
- Build output does NOT contain the warning `The "images.domains" configuration is deprecated`
- Build output does NOT contain the error `hostname "images.unsplash.com" is not configured`
</acceptance_criteria>
</task>

## Verification

```bash
cd /Users/BlairDalziel/Documents/Claude/elevated-apartment-locating

# 1. Confirm remotePatterns is configured
grep -q "remotePatterns" next.config.mjs && echo "OK: remotePatterns present"
grep -q "images.unsplash.com" next.config.mjs && echo "OK: Unsplash hostname present"

# 2. Confirm deprecated domains syntax is NOT used
! grep -q "domains:" next.config.mjs && echo "OK: no deprecated domains array"

# 3. Confirm sections directory exists
[ -d components/sections ] && echo "OK: components/sections/ exists"

# 4. TypeScript clean
npx tsc --noEmit

# 5. Build clean (no Unsplash hostname errors)
npm run build
```

## Must Haves
- [ ] `next.config.mjs` contains `remotePatterns` array with `hostname: 'images.unsplash.com'` and `pathname: '/**'`
- [ ] `next.config.mjs` does NOT use the deprecated `domains:` array
- [ ] Directory `components/sections/` exists in the filesystem
- [ ] `npx tsc --noEmit` exits with code 0
- [ ] `npm run build` exits with code 0
