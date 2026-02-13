# Contributing to VCET FOSS Directory

> **"Your first PR doesn't need to be perfect."**

Thanks for wanting to contribute! This guide covers everything you need.

## Contents

- [How It Works](#how-it-works)
- [Who Can Contribute](#who-can-contribute)
- [Adding a Project](#adding-a-project)
- [project.json Template](#projectjson-template)
- [Field Reference](#field-reference)
- [Testing Locally](#testing-locally)
- [Opening a PR](#opening-a-pr)
- [Repo Structure](#repo-structure)
- [For Maintainers](#for-maintainers)
- [What NOT to Do](#what-not-to-do)
- [Getting Help](#getting-help)
- [Code of Conduct](#code-of-conduct)

## How It Works

```
Students / Teams
   ↓ (Pull Request)
awesome-foss (source of truth)
   ↓ (GitHub Actions validates + builds)
dev/generated/projects.json
   ↓ (Fetched at runtime)
vcet-foss.github.io (website)
```

## Who Can Contribute

Anyone! You don't need to be from VCET. If you have a project idea or want to improve an existing one, go for it.

## Adding a Project

### 1. Fork & clone

```bash
git clone https://github.com/YOUR-USERNAME/awesome-foss.git
cd awesome-foss
```

### 2. Create your project folder

```
projects/your-project-slug/
├── project.json
└── README.md
```

- Folder name **must** match the `slug` in `project.json`
- Use **lowercase kebab-case**: `my-cool-project` ✅ | `MyCoolProject` ❌

### 3. Fill in `project.json` (see template below)

### 4. Write a `README.md` for your project

Include: what it does, tech stack, how to get started, and how to contribute.

### 5. Test locally → Open PR

## project.json Template

```json
{
  "slug": "your-project-slug",
  "name": "Your Project Name",
  "tagline": "One line about what it does",
  "description": "A longer description (10-500 characters).",
  "status": "idea",
  "difficulty": "beginner",
  "tech_stack": ["React", "Python"],
  "github_repo": "https://github.com/vcet-foss/your-project-slug",
  "maintainers": [
    {
      "name": "Your Name",
      "contact": "your@email.com"
    }
  ],
  "looking_for_contributors": true,
  "domain": ["Web"]
}
```

## Field Reference

| Field | Type | Required | Allowed Values |
|-------|------|----------|----------------|
| `slug` | string | ✅ | lowercase kebab-case, must match folder name |
| `name` | string | ✅ | 1–100 characters |
| `tagline` | string | ✅ | 1–150 characters |
| `description` | string | ✅ | 10–500 characters |
| `status` | string | ✅ | `active`, `dormant`, `idea` |
| `difficulty` | string | ✅ | `beginner`, `intermediate`, `advanced` |
| `tech_stack` | string[] | ✅ | At least one technology |
| `github_repo` | string | ✅ | Must start with `https://github.com/` |
| `maintainers` | object[] | ✅ | At least one `{ name, contact }` |
| `looking_for_contributors` | boolean | ✅ | `true` or `false` |
| `domain` | string[] | ❌ | One or more of: `Web`, `AI/ML`, `GenAI`, `Blockchain`, `IoT/Embedded` |

## Testing Locally

```bash
node dev/scripts/build-projects.js
```

- ✅ means you're good to go
- ❌ means something's wrong — the error message will tell you exactly what

## Opening a PR

1. Push to your fork
2. Open a PR to `main`
3. Title: **`Add project: your-project-name`**
4. CI will automatically validate your `project.json`

### Example PR

**Title:** `Add project: LAN Share App`

**Body:**
```
Adds the LAN Share App project — a peer-to-peer file sharing app for local networks.

- [x] project.json passes validation
- [x] README.md included
- [x] Tested with `node dev/scripts/build-projects.js`
```

## Repo Structure

```
awesome-foss/
├── projects/              ← One folder per project
│   ├── lan-share-app/
│   │   ├── project.json
│   │   └── README.md
│   └── ...
├── dev/                   ← Build tooling
│   ├── schemas/           ← JSON Schema for validation
│   ├── scripts/           ← Build & validation scripts
│   └── generated/         ← Auto-generated output (don't edit)
├── .github/workflows/     ← CI pipeline
├── CONTRIBUTING.md        ← You are here
└── README.md              ← Project listing
```

## For Maintainers

### Labels

| Label | Use for |
|-------|---------|
| `new-project` | PRs that add a new project |
| `needs-fix` | PRs with validation errors |
| `approved` | Ready to merge |

### Build locally

```bash
node dev/scripts/build-projects.js
```

Validates all `projects/*/project.json` and outputs `dev/generated/projects.json` + updates `README.md`.

## What NOT to Do

- ❌ Don't edit `dev/generated/projects.json` — it's auto-generated
- ❌ Don't edit the `<!-- PROJECTS:START -->` section in `README.md` — it's auto-generated
- ❌ Don't add random files to the root directory
- ❌ Don't use spaces or uppercase in folder names

## Getting Help

- **GitHub Issues** — Open one if you're stuck
- **Discussions** — Ask questions, share ideas
- **Discord** — Join the VCET FOSS community server

## Code of Conduct

Be kind. Be respectful. We're all learning here.

We follow the [Contributor Covenant](https://www.contributor-covenant.org/version/2/1/code_of_conduct/).

---

Every project starts with a single commit. 🚀
