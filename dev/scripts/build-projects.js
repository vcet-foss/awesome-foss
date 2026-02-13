#!/usr/bin/env node

// build-projects.js
//
// Reads all projects/<slug>/project.json files, validates them against
// the schema, and merges them into dev/generated/projects.json.
//
// Usage:  node dev/scripts/build-projects.js
// Exit 0 = success, Exit 1 = validation errors

const { readFileSync, writeFileSync, mkdirSync, readdirSync, statSync } = require("node:fs");
const { join, resolve } = require("node:path");

// ROOT = awesome-foss/ (two levels up from dev/scripts/)
const ROOT = resolve(__dirname, "..", "..");

// ── Load schema ──────────────────────────────────────────────────────────────
const schema = JSON.parse(
  readFileSync(join(ROOT, "dev", "schemas", "project.schema.json"), "utf-8")
);

// ── Validators ───────────────────────────────────────────────────────────────

function validateProject(project, folderName) {
  const errors = [];

  // Check required fields
  for (const field of schema.required) {
    if (!(field in project)) {
      errors.push(`Missing required field: "${field}"`);
    }
  }

  // Check no extra fields
  const allowed = Object.keys(schema.properties);
  for (const key of Object.keys(project)) {
    if (!allowed.includes(key)) {
      errors.push(`Unknown field: "${key}"`);
    }
  }

  if (errors.length > 0) return errors; // early exit — can't validate further

  // slug must match folder name
  if (project.slug !== folderName) {
    errors.push(
      `Slug "${project.slug}" does not match folder name "${folderName}"`
    );
  }

  // slug pattern
  const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
  if (!slugPattern.test(project.slug)) {
    errors.push(`Slug "${project.slug}" must be lowercase kebab-case`);
  }

  // String fields
  for (const [field, spec] of Object.entries(schema.properties)) {
    if (spec.type === "string" && field in project) {
      if (typeof project[field] !== "string") {
        errors.push(`"${field}" must be a string`);
        continue;
      }
      if (spec.minLength && project[field].length < spec.minLength) {
        errors.push(`"${field}" must be at least ${spec.minLength} characters`);
      }
      if (spec.maxLength && project[field].length > spec.maxLength) {
        errors.push(`"${field}" must be at most ${spec.maxLength} characters`);
      }
      if (spec.enum && !spec.enum.includes(project[field])) {
        errors.push(
          `"${field}" must be one of: ${spec.enum.join(", ")}. Got: "${project[field]}"`
        );
      }
      if (spec.pattern) {
        const regex = new RegExp(spec.pattern);
        if (!regex.test(project[field])) {
          errors.push(`"${field}" does not match pattern ${spec.pattern}`);
        }
      }
    }
  }

  // tech_stack
  if (!Array.isArray(project.tech_stack)) {
    errors.push(`"tech_stack" must be an array`);
  } else {
    if (project.tech_stack.length < 1) {
      errors.push(`"tech_stack" must have at least 1 item`);
    }
    for (const item of project.tech_stack) {
      if (typeof item !== "string") {
        errors.push(`Each item in "tech_stack" must be a string`);
      }
    }
  }

  // maintainers
  if (!Array.isArray(project.maintainers)) {
    errors.push(`"maintainers" must be an array`);
  } else {
    if (project.maintainers.length < 1) {
      errors.push(`"maintainers" must have at least 1 entry`);
    }
    for (const [i, m] of project.maintainers.entries()) {
      if (typeof m !== "object" || m === null || Array.isArray(m)) {
        errors.push(`maintainers[${i}] must be an object`);
        continue;
      }
      if (!m.name || typeof m.name !== "string") {
        errors.push(`maintainers[${i}].name is required and must be a string`);
      }
      if (!m.contact || typeof m.contact !== "string") {
        errors.push(`maintainers[${i}].contact is required and must be a string`);
      }
      const allowedKeys = ["name", "contact"];
      for (const key of Object.keys(m)) {
        if (!allowedKeys.includes(key)) {
          errors.push(`maintainers[${i}] has unknown field: "${key}"`);
        }
      }
    }
  }

  // looking_for_contributors
  if (typeof project.looking_for_contributors !== "boolean") {
    errors.push(`"looking_for_contributors" must be a boolean`);
  }

  // domain (optional)
  if ("domain" in project) {
    if (!Array.isArray(project.domain)) {
      errors.push(`"domain" must be an array`);
    } else {
      const validDomains = ["Web", "AI/ML", "GenAI", "Blockchain", "IoT/Embedded"];
      for (const d of project.domain) {
        if (typeof d !== "string") {
          errors.push(`Each item in "domain" must be a string`);
        } else if (!validDomains.includes(d)) {
          errors.push(`"domain" contains invalid value: "${d}". Must be one of: ${validDomains.join(", ")}`);
        }
      }
      // Check uniqueness
      const unique = new Set(project.domain);
      if (unique.size !== project.domain.length) {
        errors.push(`"domain" array contains duplicate values`);
      }
    }
  }


  return errors;
}

// ── Main ─────────────────────────────────────────────────────────────────────

function main() {
  const projectsDir = join(ROOT, "projects");
  const outputDir = join(ROOT, "dev", "generated");
  const outputFile = join(outputDir, "projects.json");

  let folders;
  try {
    folders = readdirSync(projectsDir).filter((name) =>
      statSync(join(projectsDir, name)).isDirectory()
    );
  } catch {
    console.error("❌ Could not read projects/ directory");
    process.exit(1);
  }

  if (folders.length === 0) {
    console.error("❌ No project folders found in projects/");
    process.exit(1);
  }

  console.log(`\n📦 Found ${folders.length} project(s)\n`);

  let hasErrors = false;
  const allProjects = [];

  for (const folder of folders.sort()) {
    const jsonPath = join(projectsDir, folder, "project.json");
    console.log(`  → ${folder}/project.json`);

    let raw;
    try {
      raw = readFileSync(jsonPath, "utf-8");
    } catch {
      console.error(`    ❌ Missing project.json\n`);
      hasErrors = true;
      continue;
    }

    let project;
    try {
      project = JSON.parse(raw);
    } catch (e) {
      console.error(`    ❌ Invalid JSON: ${e.message}\n`);
      hasErrors = true;
      continue;
    }

    const errors = validateProject(project, folder);
    if (errors.length > 0) {
      hasErrors = true;
      for (const err of errors) {
        console.error(`    ❌ ${err}`);
      }
      console.log();
    } else {
      console.log(`    ✅ Valid\n`);
      allProjects.push(project);
    }
  }

  if (hasErrors) {
    console.error("❌ Validation failed. Fix the errors above and try again.\n");
    process.exit(1);
  }

  // Write projects.json
  mkdirSync(outputDir, { recursive: true });
  writeFileSync(outputFile, JSON.stringify(allProjects, null, 2) + "\n");

  console.log(`✅ Generated ${outputFile}`);
  console.log(`   ${allProjects.length} project(s) written\n`);

  // Update README.md project list
  updateReadme(allProjects);
}

// ── README Updater ───────────────────────────────────────────────────────────

function formatProjectLine(p) {
  return `- [${p.name}](${p.github_repo}) — ${p.tagline}.`;
}

function updateReadme(projects) {
  const readmePath = join(ROOT, "README.md");

  let readme;
  try {
    readme = readFileSync(readmePath, "utf-8");
  } catch {
    console.log("⚠️  No README.md found, skipping project list update");
    return;
  }

  const startMarker = "<!-- PROJECTS:START - Do not remove or modify this section -->";
  const endMarker = "<!-- PROJECTS:END -->";

  const startIdx = readme.indexOf(startMarker);
  const endIdx = readme.indexOf(endMarker);

  if (startIdx === -1 || endIdx === -1) {
    console.log("⚠️  README.md missing PROJECTS markers, skipping update");
    return;
  }

  // Group by status, sort alphabetically within each group
  const groups = { active: [], idea: [], dormant: [] };
  for (const p of projects) {
    if (groups[p.status]) groups[p.status].push(p);
  }
  for (const key of Object.keys(groups)) {
    groups[key].sort((a, b) => a.name.localeCompare(b.name));
  }

  // Build the section
  const lines = [];
  lines.push("");

  if (groups.active.length > 0) {
    lines.push("### Active");
    lines.push("");
    for (const p of groups.active) lines.push(formatProjectLine(p));
    lines.push("");
  }

  if (groups.idea.length > 0) {
    lines.push("### Ideas");
    lines.push("");
    for (const p of groups.idea) lines.push(formatProjectLine(p));
    lines.push("");
  }

  if (groups.dormant.length > 0) {
    lines.push("### Dormant");
    lines.push("");
    for (const p of groups.dormant) lines.push(formatProjectLine(p));
    lines.push("");
  } else {
    lines.push("### Dormant");
    lines.push("");
    lines.push("_No dormant projects yet. Let's keep it that way_ 💪");
    lines.push("");
  }

  const newSection = startMarker + "\n" + lines.join("\n") + endMarker;
  const updatedReadme =
    readme.substring(0, startIdx) + newSection + readme.substring(endIdx + endMarker.length);

  writeFileSync(readmePath, updatedReadme);
  console.log("✅ Updated README.md project list\n");
}

main();
