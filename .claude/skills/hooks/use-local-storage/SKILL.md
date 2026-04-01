---
name: f-rha-use-local-storage
description: Use when the user wants to persist React state to localStorage, read stored values on mount, or clear a stored key. Covers controlled get/set/remove with JSON serialization and error handling.
---

# useLocalStorage — f-rha

Persist React state to `localStorage`. Reads the stored value on mount and keeps state in sync on every update.

## Signature

```js
const [value, setValue, removeValue] = useLocalStorage(key, initialValue);
```

## Parameters

| Parameter      | Type     | Description                                     |
|----------------|----------|-------------------------------------------------|
| `key`          | `string` | localStorage key                                |
| `initialValue` | `any`    | Fallback value when key doesn't exist yet       |

## Returns

| Index | Name          | Type                       | Description                          |
|-------|---------------|----------------------------|--------------------------------------|
| 0     | `value`       | `any`                      | Current stored value                 |
| 1     | `setValue`    | `(value \| fn) => void`    | Update state and localStorage        |
| 2     | `removeValue` | `() => void`               | Remove key and reset to initialValue |

## Usage

```jsx
import { useLocalStorage } from "f-rha";

// Basic
const [theme, setTheme] = useLocalStorage("theme", "light");

<button onClick={() => setTheme("dark")}>Dark mode</button>

// Functional update (same as useState)
const [count, setCount] = useLocalStorage("count", 0);
<button onClick={() => setCount((c) => c + 1)}>+1</button>

// Remove
const [, , clearTheme] = useLocalStorage("theme", "light");
<button onClick={clearTheme}>Reset</button>
```

## Changelog

### 1.0.0
- Initial release
- JSON serialization / deserialization
- Functional updater support
- removeValue to clear key
