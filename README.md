# F-RHA

一個輕量的 React UI 元件庫，包含常用元件與 Hooks，並內建 Claude Code skill 支援。

---

## 安裝

```bash
npm install f-rha
```

安裝完成後會自動將 skill 文件複製到你的專案 `.claude/skills/` 中，在 Claude Code 裡可直接使用 `/f-rha-button` 等指令查詢用法。

---

## 快速開始

```jsx
import { Button, Input, Dialog, Radio } from "f-rha";
import { useDebounce, useLocalStorage } from "f-rha";
```

---

## 元件

### Button

```jsx
<Button variant="primary" size="md" onClick={() => {}}>
  送出
</Button>

<Button variant="outline" disabled>
  取消
</Button>
```

| Prop | 類型 | 預設值 | 說明 |
|------|------|--------|------|
| `variant` | `"primary"` `"secondary"` `"outline"` | `"primary"` | 外觀樣式 |
| `size` | `"sm"` `"md"` `"lg"` | `"md"` | 大小 |
| `disabled` | `boolean` | `false` | 是否禁用 |
| `onClick` | `() => void` | — | 點擊事件 |

---

### Input

```jsx
const [value, setValue] = useState("");

<Input
  label="電子郵件"
  placeholder="you@example.com"
  value={value}
  onChange={(e) => setValue(e.target.value)}
/>

<Input
  label="密碼"
  type="password"
  value={value}
  onChange={(e) => setValue(e.target.value)}
  error="密碼為必填欄位"
/>
```

| Prop | 類型 | 預設值 | 說明 |
|------|------|--------|------|
| `label` | `string` | — | 欄位標籤 |
| `placeholder` | `string` | `""` | 提示文字 |
| `value` | `string` | — | 受控值 |
| `onChange` | `(e) => void` | — | 變更事件 |
| `type` | `string` | `"text"` | HTML input type |
| `disabled` | `boolean` | `false` | 是否禁用 |
| `error` | `string` | — | 錯誤訊息 |

---

### Dialog

```jsx
const [open, setOpen] = useState(false);

<Button onClick={() => setOpen(true)}>開啟</Button>

<Dialog
  open={open}
  onClose={() => setOpen(false)}
  title="確認操作"
  footer={
    <>
      <Button variant="secondary" onClick={() => setOpen(false)}>取消</Button>
      <Button onClick={() => setOpen(false)}>確認</Button>
    </>
  }
>
  確定要繼續執行嗎？
</Dialog>
```

| Prop | 類型 | 預設值 | 說明 |
|------|------|--------|------|
| `open` | `boolean` | `false` | 控制顯示 / 隱藏 |
| `onClose` | `() => void` | — | 關閉時觸發（點擊遮罩或按 Esc） |
| `title` | `string` | — | 標題文字 |
| `footer` | `ReactNode` | — | 底部內容（通常放按鈕） |
| `width` | `string` | `"480px"` | 對話框寬度 |

---

### Radio

```jsx
const [selected, setSelected] = useState("react");

// 簡單字串陣列
<Radio
  name="framework"
  label="選擇框架"
  options={["react", "vue", "svelte"]}
  value={selected}
  onChange={setSelected}
/>

// 物件陣列（支援單獨禁用）
<Radio
  name="plan"
  label="訂閱方案"
  options={[
    { label: "免費版", value: "free" },
    { label: "專業版", value: "pro" },
    { label: "企業版", value: "enterprise", disabled: true },
  ]}
  value={selected}
  onChange={setSelected}
/>
```

| Prop | 類型 | 預設值 | 說明 |
|------|------|--------|------|
| `options` | `string[]` 或 `{ label, value, disabled? }[]` | `[]` | 選項列表 |
| `value` | `string` | — | 目前選中的值 |
| `onChange` | `(value: string) => void` | — | 選項變更時觸發 |
| `name` | `string` | — | HTML name 屬性 |
| `label` | `string` | — | 群組標籤 |
| `disabled` | `boolean` | `false` | 禁用所有選項 |

---

## Hooks

### useDebounce

延遲更新一個快速變動的值，避免過於頻繁的 re-render 或 API 呼叫。

```jsx
import { useDebounce } from "f-rha";

function Search() {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 400);

  useEffect(() => {
    if (debouncedQuery) fetchResults(debouncedQuery);
  }, [debouncedQuery]);

  return (
    <input
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      placeholder="搜尋..."
    />
  );
}
```

| 參數 | 類型 | 預設值 | 說明 |
|------|------|--------|------|
| `value` | `any` | — | 要延遲的值 |
| `delay` | `number` | `300` | 延遲毫秒數 |

---

### useLocalStorage

將 React state 同步至 `localStorage`，重新整理後仍保留值。

```jsx
import { useLocalStorage } from "f-rha";

const [theme, setTheme, clearTheme] = useLocalStorage("theme", "light");

// 更新
setTheme("dark");

// 函式型更新（同 useState）
const [count, setCount] = useLocalStorage("count", 0);
setCount((c) => c + 1);

// 清除
clearTheme();
```

| 參數 | 類型 | 說明 |
|------|------|------|
| `key` | `string` | localStorage 鍵名 |
| `initialValue` | `any` | 鍵不存在時的預設值 |

**回傳值：** `[value, setValue, removeValue]`

---

## 版本

| 元件 / Hook | 版本 |
|-------------|------|
| Button | 1.0.0 |
| Input | 1.0.0 |
| Dialog | 1.0.0 |
| Radio | 1.0.0 |
| useDebounce | 1.0.0 |
| useLocalStorage | 1.0.0 |

---

## 需求環境

- React `>= 17.0.0`

---

## 授權

MIT
