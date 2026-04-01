import { copyFileSync, mkdirSync, existsSync } from "fs";
import { join, resolve } from "path";
import { fileURLToPath } from "url";

// 當這個 script 在 node_modules/f-rha/scripts/ 裡執行時，packageRoot 指向 node_modules/f-rha/
const packageRoot = resolve(fileURLToPath(new URL(".", import.meta.url)), "..");

// INIT_CWD 是 npm install 被執行時的專案根目錄（npm 自動設定）
const projectRoot = process.env.INIT_CWD;

if (!projectRoot) {
  // 在開發 f-rha 本身時直接 npm install，不需要複製
  process.exit(0);
}

// 不要複製到自己這個套件的開發目錄
if (resolve(projectRoot) === resolve(packageRoot)) {
  process.exit(0);
}

const components = ["Button", "Input", "Dialog", "Radio"];

let copied = 0;
for (const component of components) {
  const src = join(packageRoot, ".claude", component, "SKILL.md");
  if (!existsSync(src)) continue;

  const targetDir = join(projectRoot, ".claude", "f-rha", component);
  mkdirSync(targetDir, { recursive: true });
  copyFileSync(src, join(targetDir, "SKILL.md"));
  copied++;
}

if (copied > 0) {
  console.log(`[f-rha] ✓ Copied ${copied} SKILL.md files → .claude/f-rha/`);
}
