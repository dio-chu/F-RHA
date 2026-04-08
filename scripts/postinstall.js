import {
  copyFileSync,
  existsSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  rmSync,
  writeFileSync,
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
const changelogFile = join(targetBaseDir, "f-rha-changelog.md");

// 讀取套件版本
const pkg = JSON.parse(
  readFileSync(join(packageRoot, "package.json"), "utf-8"),
);
const pkgVersion = pkg.version;

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

// 寫入 changelog 檔案
const hasChanges = added.length || updated.length || removed.length;

if (hasChanges) {
  const timestamp = new Date().toISOString().replace("T", " ").slice(0, 19);
  const lines = [`# f-rha skills changelog`, ``];

  // 讀取既有 changelog 歷史（跳過標題）
  let history = "";
  if (existsSync(changelogFile)) {
    const old = readFileSync(changelogFile, "utf-8");
    const idx = old.indexOf("\n## ");
    if (idx !== -1) {
      history = old.slice(idx);
    }
  }

  lines.push(`## v${pkgVersion} — ${timestamp}`);
  lines.push(``);

  for (const name of added) {
    lines.push(`- + \`${name}\` — added`);
  }
  for (const name of updated) {
    lines.push(`- ↑ \`${name}\` — updated`);
  }
  for (const name of removed) {
    lines.push(`- ✕ \`${name}\` — removed`);
  }

  lines.push(``);
  const summary = [
    added.length && `${added.length} added`,
    updated.length && `${updated.length} updated`,
    removed.length && `${removed.length} removed`,
  ]
    .filter(Boolean)
    .join(", ");
  lines.push(`> ${summary}`);

  if (history) {
    lines.push(history);
  }

  writeFileSync(changelogFile, lines.join("\n") + "\n", "utf-8");
}

// 更新安裝端的 .claude/settings.json，注入 marketplace 設定
const MARKETPLACE_ID = "f-rha-marketplace";
const MARKETPLACE_PLUGINS = [
  "f-rha-button",
  "f-rha-dialog",
  "f-rha-input",
  "f-rha-radio",
  "f-rha-select",
  "f-rha-tooltip",
  "f-rha-use-debounce",
  "f-rha-use-local-storage",
];

const settingsDir = join(projectRoot, ".claude");
const settingsPath = join(settingsDir, "settings.json");

let settings = {};
if (existsSync(settingsPath)) {
  try {
    settings = JSON.parse(readFileSync(settingsPath, "utf-8"));
  } catch {
    settings = {};
  }
}

if (!settings.extraKnownMarketplaces) settings.extraKnownMarketplaces = {};
settings.extraKnownMarketplaces[MARKETPLACE_ID] = {
  source: {
    source: "github",
    repo: "dio-chu/f-rha-marketplace",
    ref: `v${pkgVersion}`,
  },
};

if (!settings.enabledPlugins) settings.enabledPlugins = {};

// 移除屬於此 marketplace 但本版本已不存在的舊 plugins
const validKeys = new Set(
  MARKETPLACE_PLUGINS.map((p) => `${p}@${MARKETPLACE_ID}`),
);
for (const key of Object.keys(settings.enabledPlugins)) {
  if (key.endsWith(`@${MARKETPLACE_ID}`) && !validKeys.has(key)) {
    delete settings.enabledPlugins[key];
  }
}

for (const plugin of MARKETPLACE_PLUGINS) {
  settings.enabledPlugins[`${plugin}@${MARKETPLACE_ID}`] = true;
}

mkdirSync(settingsDir, { recursive: true });
writeFileSync(settingsPath, JSON.stringify(settings, null, 2) + "\n", "utf-8");

// 清理 node_modules 中的 .claude 資料夾
try {
  const claudeDir = join(packageRoot, ".claude");
  if (existsSync(claudeDir)) {
    rmSync(claudeDir, { recursive: true, force: true });
  }
} catch {
  // 刪除失敗不影響使用
}
