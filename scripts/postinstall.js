import {
  copyFileSync,
  existsSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  rmSync,
} from "fs";
import { join, resolve } from "path";
import { fileURLToPath } from "url";

const packageRoot = resolve(fileURLToPath(new URL(".", import.meta.url)), "..");
const projectRoot = process.env.INIT_CWD;

if (!projectRoot || resolve(projectRoot) === resolve(packageRoot)) {
  process.exit(0);
}

const skillsDir = join(packageRoot, ".claude", "skills");

if (!existsSync(skillsDir)) {
  process.exit(0);
}

const PREFIX = "f-rha-";
const targetBaseDir = join(projectRoot, ".claude", "skills");

// 收集本版本所有 skill 名稱
const newSkillNames = new Set();
const categories = readdirSync(skillsDir, { withFileTypes: true })
  .filter((d) => d.isDirectory())
  .map((d) => d.name);

for (const category of categories) {
  const categoryDir = join(skillsDir, category);
  const skills = readdirSync(categoryDir, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name);
  for (const skill of skills) {
    newSkillNames.add(skill);
  }
}

// 找出目標目錄中已存在的 f-rha- 開頭 skill
const existingSkillDirs = existsSync(targetBaseDir)
  ? readdirSync(targetBaseDir, { withFileTypes: true })
      .filter((d) => d.isDirectory() && d.name.startsWith(PREFIX))
      .map((d) => d.name.slice(PREFIX.length))
  : [];

const added = [];
const updated = [];
const removed = [];
const unchanged = [];

// 複製新版 skill，判斷 新增 / 更新 / 未變動
for (const category of categories) {
  const categoryDir = join(skillsDir, category);
  const skills = readdirSync(categoryDir, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name);

  for (const skill of skills) {
    const src = join(categoryDir, skill, "SKILL.md");
    const targetDir = join(targetBaseDir, `${PREFIX}${skill}`);
    const targetFile = join(targetDir, "SKILL.md");

    const newContent = readFileSync(src, "utf-8");
    const isExisting = existsSync(targetFile);

    if (isExisting) {
      const oldContent = readFileSync(targetFile, "utf-8");
      if (oldContent === newContent) {
        unchanged.push(skill);
        continue;
      }
      updated.push(skill);
    } else {
      added.push(skill);
    }

    mkdirSync(targetDir, { recursive: true });
    copyFileSync(src, targetFile);
  }
}

// 刪除不再存在的 f-rha skill
for (const existing of existingSkillDirs) {
  if (!newSkillNames.has(existing)) {
    rmSync(join(targetBaseDir, `${PREFIX}${existing}`), {
      recursive: true,
      force: true,
    });
    removed.push(existing);
  }
}

// 輸出結果
const hasChanges = added.length || updated.length || removed.length;

if (hasChanges) {
  console.log();
  console.log("  ┌──────────────────────────────────────┐");
  console.log("  │        f-rha · skills sync            │");
  console.log("  └──────────────────────────────────────┘");
  console.log();

  for (const name of added) {
    console.log(`    + ${name}`);
  }
  for (const name of updated) {
    console.log(`    ↑ ${name}`);
  }
  for (const name of removed) {
    console.log(`    - ${name}`);
  }

  console.log();
  const parts = [
    added.length && `${added.length} added`,
    updated.length && `${updated.length} updated`,
    removed.length && `${removed.length} removed`,
  ].filter(Boolean);
  console.log(`  ${parts.join(", ")}`);
  console.log();
}

// 清理 node_modules 中的 skill 檔案
try {
  rmSync(skillsDir, { recursive: true, force: true });
} catch {
  // 刪除失敗不影響使用
}
