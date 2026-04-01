import { copyFileSync, mkdirSync, existsSync } from "fs";
import { join, resolve } from "path";
import { fileURLToPath } from "url";

const packageRoot = resolve(fileURLToPath(new URL(".", import.meta.url)), "..");
const projectRoot = process.env.INIT_CWD;

if (!projectRoot || resolve(projectRoot) === resolve(packageRoot)) {
  process.exit(0);
}

const components = ["button", "input", "dialog", "radio"];

let copied = 0;
for (const component of components) {
  const src = join(packageRoot, ".claude", "skills", component, "SKILL.md");
  if (!existsSync(src)) continue;

  const targetDir = join(projectRoot, ".claude", "skills", `f-rha-${component}`);
  mkdirSync(targetDir, { recursive: true });
  copyFileSync(src, join(targetDir, "SKILL.md"));
  copied++;
}

if (copied > 0) {
  console.log(`[f-rha] ✓ Copied ${copied} skills → .claude/skills/f-rha-{component}/`);
}
