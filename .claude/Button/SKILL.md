# Button

**Version:** 1.0.0

A clickable button component with multiple variants and sizes.

## Props

| Prop       | Type                                  | Default     | Description                  |
|------------|---------------------------------------|-------------|------------------------------|
| `children` | `ReactNode`                           | —           | Button label / content       |
| `variant`  | `"primary" \| "secondary" \| "outline"` | `"primary"` | Visual style                 |
| `size`     | `"sm" \| "md" \| "lg"`               | `"md"`      | Button size                  |
| `disabled` | `boolean`                             | `false`     | Disables the button          |
| `onClick`  | `() => void`                          | —           | Click handler                |

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
