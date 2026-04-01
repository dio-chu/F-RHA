---
name: f-rha-button
description: Use when the user wants to use, customize, or ask about the Button component from the f-rha library. Covers variants (primary, secondary, outline), sizes (sm, md, lg), disabled state, and click handling 測試檔案是否直接覆蓋.
---

# Button — f-rha

A clickable button component.

## Props

| Prop       | Type                                    | Default     | Description            |
| ---------- | --------------------------------------- | ----------- | ---------------------- |
| `children` | `ReactNode`                             | —           | Button label / content |
| `variant`  | `"primary" \| "secondary" \| "outline"` | `"primary"` | Visual style           |
| `size`     | `"sm" \| "md" \| "lg"`                  | `"md"`      | Button size            |
| `disabled` | `boolean`                               | `false`     | Disables the button    |
| `onClick`  | `() => void`                            | —           | Click handler          |

## Usage

```jsx
import { Button } from "f-rha";

<Button variant="primary" size="md" onClick={() => console.log("clicked")}>
  Submit
</Button>

<Button variant="outline" disabled>
  Cancel
</Button>
```

## Changelog

### 1.0.0

- Initial release
- Variants: primary, secondary, outline
- Sizes: sm, md, lg
- Disabled state support
