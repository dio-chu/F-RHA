# Radio

**Version:** 1.0.0

A radio button group component for single-selection from a list of options.

## Props

| Prop       | Type                                                    | Default | Description                                          |
|------------|---------------------------------------------------------|---------|------------------------------------------------------|
| `options`  | `string[] \| { label: string; value: string; disabled?: boolean }[]` | `[]`    | List of options |
| `value`    | `string`                                                | —       | Currently selected value                             |
| `onChange` | `(value: string) => void`                               | —       | Called with the selected value when changed          |
| `name`     | `string`                                                | —       | HTML name attribute, used to group radio inputs      |
| `label`    | `string`                                                | —       | Group label displayed above the options              |
| `disabled` | `boolean`                                               | `false` | Disables all options                                 |

## Usage

```jsx
import { Radio } from "f-rha";

const [selected, setSelected] = useState("react");

// Simple string array
<Radio
  name="framework"
  label="Pick a framework"
  options={["react", "vue", "svelte"]}
  value={selected}
  onChange={setSelected}
/>

// Object array with per-option disabled
<Radio
  name="plan"
  label="Subscription"
  options={[
    { label: "Free", value: "free" },
    { label: "Pro", value: "pro" },
    { label: "Enterprise", value: "enterprise", disabled: true },
  ]}
  value={selected}
  onChange={setSelected}
/>
```

## Changelog

### 1.0.0
- Initial release
- String and object option formats
- Per-option and group-level disabled support
