---
name: f-rha-link
description: Use when the user wants to use, customize, or ask about the Link component from the f-rha library. Covers variants (primary, secondary, underline), external links with icon, disabled state, and click handling.
---

# Link — f-rha

A styled anchor link component with support for external links and multiple visual variants.

## Props

| Prop       | Type                                      | Default     | Description                              |
| ---------- | ----------------------------------------- | ----------- | ---------------------------------------- |
| `children` | `ReactNode`                               | —           | Link text / content                      |
| `href`     | `string`                                  | `"#"`       | Link destination URL                     |
| `variant`  | `"primary" \| "secondary" \| "underline"` | `"primary"` | Visual style                             |
| `external` | `boolean`                                 | `false`     | Opens in new tab with external icon      |
| `disabled` | `boolean`                                 | `false`     | Disables the link (prevents navigation)  |
| `onClick`  | `(e) => void`                             | —           | Click handler (called before navigation) |

## Usage

```jsx
import { Link } from "f-rha";

<Link href="/about" variant="primary">
  About Us
</Link>

<Link href="https://example.com" variant="underline" external>
  External Resource
</Link>

<Link href="/disabled" disabled>
  Coming Soon
</Link>
```

## Features

- **External Links**: Automatically adds `target="_blank"` and `rel="noopener noreferrer"` with a visual indicator (↗)
- **Disabled State**: Prevents click and navigation when disabled
- **Variants**: Three visual styles to match different UI contexts
- **Accessibility**: External icon includes `aria-label` for screen readers

## Changelog

### 1.0.0

- Initial release
- Variants: primary, secondary, underline
- External link support with icon
- Disabled state support
