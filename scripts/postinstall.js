import { copyFileSync, mkdirSync, readdirSync } from "fs";
import { join, resolve } from "path";
import { fileURLToPath } from "url";

const packageRoot = resolve(fileURLToPath(new URL(".", import.meta.url)), "..");
const projectRoot = process.env.INIT_CWD;

if (!projectRoot || resolve(projectRoot) === resolve(packageRoot)) {
  process.exit(0);
}

const skillsDir = join(packageRoot, ".claude", "skills");
const components = readdirSync(skillsDir, { withFileTypes: true })
  .filter((d) => d.isDirectory())
  .map((d) => d.name);

let copied = 0;
for (const component of components) {
  const src = join(skillsDir, component, "SKILL.md");
  const targetDir = join(projectRoot, ".claude", "skills", `f-rha-${component}`);
  mkdirSync(targetDir, { recursive: true });
  copyFileSync(src, join(targetDir, "SKILL.md"));
  copied++;
}

if (copied > 0) {
  console.log(`[f-rha] ✓ Copied ${copied} skills → .claude/skills/f-rha-{component}/`);
}
