#!/usr/bin/env node
/**
 * pnpm new <slug> ["Title"]
 *
 * Copies app/(prototypes)/_template → app/(prototypes)/<slug>, fills in the
 * title, and appends an entry to lib/prototypes.ts. Then open the new page.
 */
import {
  cpSync,
  existsSync,
  readFileSync,
  writeFileSync,
  readdirSync,
  statSync,
} from "node:fs";
import { join } from "node:path";

const [slugArg, ...titleParts] = process.argv.slice(2);

if (!slugArg) {
  console.error('Usage: pnpm new <slug> ["Title"]');
  process.exit(1);
}

const slug = slugArg
  .toLowerCase()
  .replace(/[^a-z0-9]+/g, "-")
  .replace(/^-+|-+$/g, "");

const title =
  titleParts.join(" ").trim() ||
  slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

const root = process.cwd();
const templateDir = join(root, "app", "(prototypes)", "_template");
const targetDir = join(root, "app", "(prototypes)", slug);
const registryPath = join(root, "lib", "prototypes.ts");

if (existsSync(targetDir)) {
  console.error(`app/(prototypes)/${slug} already exists.`);
  process.exit(1);
}

cpSync(templateDir, targetDir, { recursive: true });

// Replace the __TITLE__ marker in every file we copied.
function walk(dir) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p);
    else writeFileSync(p, readFileSync(p, "utf8").replaceAll("__TITLE__", title));
  }
}
walk(targetDir);

// Append to the registry (inserted at the top of the array).
const today = new Date().toISOString().slice(0, 10);
const entry = `  {
    slug: "${slug}",
    title: ${JSON.stringify(title)},
    description: "",
    date: "${today}",
  },
`;
const registry = readFileSync(registryPath, "utf8");
const marker = "export const prototypes: Prototype[] = [\n";
if (!registry.includes(marker)) {
  console.error(
    "Could not find the prototypes array in lib/prototypes.ts — add the entry by hand.",
  );
} else {
  writeFileSync(registryPath, registry.replace(marker, marker + entry));
}

console.log(`Created app/(prototypes)/${slug}/page.tsx and registered "${title}".`);
console.log(`→ http://localhost:3000/${slug}`);
