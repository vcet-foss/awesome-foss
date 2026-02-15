# Contributing to VCET FOSS Directory

Welcome to the VCET FOSS Directory! This document explains how the repository works and provides guidelines for contributors and maintainers.

## Want to Add Your Project?

> **→ See [ADD_PROJECT.md](ADD_PROJECT.md) for step-by-step guide to submit your project to the VCET FOSS Directory**

## Contents

- [Who Can Contribute?](#who-can-contribute)
- [How This Repository Works](#how-this-repository-works)
- [Repository Structure](#repository-structure)
- [For Maintainers](#for-maintainers)

---

## Who Can Contribute?

**Anyone!** You don't need to be from VCET. If you have a FOSS project to share, you're welcome here.

---

## How This Repository Works

### The Workflow

```
1. Contributors follow the organization and star the repo
   ↓
2. Contributors fork the repository
   ↓
3. Add their project in projects/project-name/
   ↓
4. Submit a Pull Request
   ↓
5. GitHub Actions validates project.json automatically
   ↓
6. Maintainers review and merge
   ↓
7. Build script generates dev/generated/projects.json
   ↓
8. Website (vcet-foss.github.io) fetches and displays projects
```

### Automated Validation

Every PR triggers CI checks that:
- Validate `project.json` against the schema
- Ensure folder names match slugs
- Check for required fields
- Verify JSON syntax

### Build Process

The build script (`dev/scripts/build-projects.js`):
1. Validates all `project.json` files
2. Generates `dev/generated/projects.json`
3. Updates the project list in `README.md`

---

## Repository Structure

```
awesome-foss/
├── projects/                    ← All project folders
│   ├── lan-share-app/          ← Example project
│   │   ├── project.json        ← Project metadata (required)
│   │   └── README.md           ← Project docs (required)
│   └── your-project/
│       ├── project.json
│       └── README.md
│
├── dev/
│   ├── schemas/
│   │   └── project.schema.json ← JSON Schema for validation
│   ├── scripts/
│   │   └── build-projects.js   ← Validation & build script
│   ├── generated/
│   │   └── projects.json       ← Auto-generated (DO NOT EDIT)
│   └── assets/
│       └── tutorial/            ← Video tutorials
│
├── .github/
│   └── workflows/               ← CI/CD automation
│
├── CONTRIBUTING.md              ← This file
├── ADD_PROJECT.md               ← Guide for adding projects
└── README.md                    ← Main project listing (auto-updated)
```

### Important Rules

✅ **DO:**
- Add files only to `projects/your-slug/`
- Follow the naming convention (lowercase kebab-case)
- Follow the structure in [ADD_PROJECT.md](ADD_PROJECT.md)

❌ **DON'T:**
- Edit `dev/generated/projects.json` — it's auto-generated
- Edit the project list in `README.md` between `<!-- PROJECTS:START -->` and `<!-- PROJECTS:END -->` — it's auto-updated
- Add random files to the root directory
- Use spaces or uppercase in folder names

---

## For Maintainers

### Reviewing Pull Requests

Use this checklist for each PR:

- [ ] Folder name matches `slug` in `project.json`
- [ ] `project.json` is valid JSON with all required fields
- [ ] GitHub repo URL is valid and accessible
- [ ] `README.md` is well-written and helpful
- [ ] No sensitive information (API keys, passwords, tokens)
- [ ] CI checks pass successfully
- [ ] Project fits the FOSS/open-source criteria

### PR Labels

| Label | When to Use |
|-------|-------------|
| `new-project` | PR adds a new project |
| `needs-fix` | Validation errors or issues need fixing |
| `approved` | Ready to merge |
| `question` | Need clarification from contributor |
| `documentation` | Updates to docs or guides |

### Running the Build Script Locally

```bash
# Clone the PR branch
gh pr checkout <PR-NUMBER>

# Validate and build
node dev/scripts/build-projects.js
```

**What the script does:**
1. Validates all `project.json` files against the JSON schema
2. Checks folder names match slugs
3. Generates `dev/generated/projects.json`
4. Updates the project list in `README.md`

### Merging Process

1. **Review** the code and ensure all checklist items pass
2. **Test** locally by checking out the branch and running the build script
3. **Request changes** if needed, or approve if everything looks good
4. **Merge** using "Squash and merge" to keep history clean
5. **Delete** the source branch after merging

### Maintaining Quality

- Ensure projects are genuinely open-source (have proper licenses)
- Check that maintainer contact information is valid
- Verify the GitHub repository exists and is accessible
- Look for clear project descriptions and documentation
- Encourage contributors to include setup instructions

---

## Additional Resources

- 📚 [GitHub Flow Guide](https://guides.github.com/introduction/flow/) — Learn about pull requests
- 🎓 [Markdown Guide](https://www.markdownguide.org/) — Format your README beautifully
- ✨ [Choose a License](https://choosealicense.com/) — Pick the right open-source license
- 🔧 [JSON Validator](https://jsonlint.com/) — Check your `project.json` syntax

---

**Thank you for contributing to VCET FOSS! Together, we're building an amazing open-source community. 🚀**
