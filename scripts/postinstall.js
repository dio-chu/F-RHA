import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "fs";
import { join, resolve } from "path";
import { fileURLToPath } from "url";

const packageRoot = resolve(fileURLToPath(new URL(".", import.meta.url)), "..");
const projectRoot = process.env.INIT_CWD;

if (!projectRoot || resolve(projectRoot) === resolve(packageRoot)) {
  process.exit(0);
}

// 讀取套件版本
const pkg = JSON.parse(
  readFileSync(join(packageRoot, "package.json"), "utf-8"),
);
const pkgVersion = pkg.version;

// 更新安裝端的 .claude/settings.json，注入 marketplace 設定
const MARKETPLACE_ID = "f-rha-marketplace";
const MARKETPLACE_PLUGINS = [
  "f-rha-button",
  "f-rha-dialog",
  "f-rha-input",
  "f-rha-radio",
  "f-rha-select",
  "f-rha-tooltip",
  "f-rha-card",
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
