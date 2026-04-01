import { copyFileSync, mkdirSync, readdirSync } from "fs";
import { join, resolve } from "path";
import { fileURLToPath } from "url";

const packageRoot = resolve(fileURLToPath(new URL(".", import.meta.url)), "..");
const projectRoot = process.env.INIT_CWD;

if (!projectRoot || resolve(projectRoot) === resolve(packageRoot)) {
  process.exit(0);
}

const skillsDir = join(packageRoot, ".claude", "skills");

// 讀取 components/ 和 hooks/ 兩個分類資料夾
const categories = readdirSync(skillsDir, { withFileTypes: true })
  .filter((d) => d.isDirectory())
  .map((d) => d.name);

let copied = 0;
for (const category of categories) {
  const categoryDir = join(skillsDir, category);
  const skills = readdirSync(categoryDir, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name);

  for (const skill of skills) {
    const src = join(categoryDir, skill, "SKILL.md");
    const targetDir = join(projectRoot, ".claude", "skills", `f-rha-${skill}`);
    mkdirSync(targetDir, { recursive: true });
    copyFileSync(src, join(targetDir, "SKILL.md"));
    copied++;
  }
}

if (copied > 0) {
  console.log(`[f-rha] ✓ Copied ${copied} skills → .claude/skills/f-rha-{name}/`);
}
