---
name: f-rha-select
description: Use when the user wants to use, customize, or ask about the Select component from the f-rha library. Covers options (string array or object array), placeholder, label, controlled value, error messages, disabled state, and per-option disabled.
---

# Select — f-rha

A dropdown select component with label and error message support.

## Props

| Prop          | Type                                                                 | Default       | Description                          |
| ------------- | -------------------------------------------------------------------- | ------------- | ------------------------------------ |
| `options`     | `string[] \| { label: string; value: string; disabled?: boolean }[]` | `[]`          | List of options                      |
| `value`       | `string`                                                             | —             | Controlled selected value            |
| `onChange`    | `(value: string) => void`                                            | —             | Called with the selected value       |
| `label`       | `string`                                                             | —             | Label displayed above the select     |
| `placeholder` | `string`                                                             | `"Select..."` | Placeholder option text              |
| `disabled`    | `boolean`                                                            | `false`       | Disables the select                  |
| `error`       | `string`                                                             | —             | Error message shown below the select |

## Usage

```jsx
import { Select } from "f-rha";

const [value, setValue] = useState("");

// Simple string array
<Select
  label="Country"
  options={["Taiwan", "Japan", "Korea"]}
  value={value}
  onChange={setValue}
/>

// Object array with per-option disabled
<Select
  label="Plan"
  placeholder="Choose a plan"
  options={[
    { label: "Free", value: "free" },
    { label: "Pro", value: "pro" },
    { label: "Enterprise", value: "enterprise", disabled: true },
  ]}
  value={value}
  onChange={setValue}
  error={!value ? "Please select a plan" : undefined}
/>
```

## Changelog

### 1.0.0

- Initial release
- String and object option formats
- Label, placeholder, error message support
- Per-option and global disabled state
