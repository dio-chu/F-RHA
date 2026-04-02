---
name: f-rha-button
description: Use when the user wants to use, customize, or ask about the Button component from the f-rha library. Covers variants (primary, secondary, outline), sizes (sm, md, lg), fullWidth mode, disabled state, and click handling.
---

# Button — f-rha

A clickable button component with multiple styles and sizes.

## Props

| Prop        | Type                                    | Default     | Description                  |
| ----------- | --------------------------------------- | ----------- | ---------------------------- |
| `children`  | `ReactNode`                             | —           | Button label / content       |
| `variant`   | `"primary" \| "secondary" \| "outline"` | `"primary"` | Visual style                 |
| `size`      | `"sm" \| "md" \| "lg"`                  | `"md"`      | Button size                  |
| `fullWidth` | `boolean`                               | `false`     | Expands button to full width |
| `disabled`  | `boolean`                               | `false`     | Disables the button          |
| `onClick`   | `() => void`                            | —           | Click handler                |

## Usage

```jsx
import { Button } from "f-rha";

<Button variant="primary" size="md" onClick={() => console.log("clicked")}>
  Submit
</Button>

<Button variant="outline" disabled>
  Cancel
</Button>

<Button fullWidth variant="primary">
  Full Width Button
</Button>
```

## Changelog

### 1.1.0

- Added `fullWidth` prop for 100% width buttons

### 1.0.0

- Initial release
- Variants: primary, secondary, outline
- Sizes: sm, md, lg
- Disabled state support
