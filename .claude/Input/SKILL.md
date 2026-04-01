# Input

**Version:** 1.0.0

A text input component with label and error message support.

## Props

| Prop          | Type                  | Default  | Description                          |
|---------------|-----------------------|----------|--------------------------------------|
| `label`       | `string`              | —        | Label displayed above the input      |
| `placeholder` | `string`              | `""`     | Placeholder text                     |
| `value`       | `string`              | —        | Controlled input value               |
| `onChange`    | `(e) => void`         | —        | Change event handler                 |
| `type`        | `string`              | `"text"` | HTML input type                      |
| `disabled`    | `boolean`             | `false`  | Disables the input                   |
| `error`       | `string`              | —        | Error message shown below the input  |

## Usage

```jsx
import { Input } from "f-rha";

const [value, setValue] = useState("");

<Input
  label="Email"
  placeholder="you@example.com"
  value={value}
  onChange={(e) => setValue(e.target.value)}
/>

<Input
  label="Password"
  type="password"
  value={value}
  onChange={(e) => setValue(e.target.value)}
  error="Password is required"
/>
```

## Changelog

### 1.0.0
- Initial release
- Label, placeholder, error message support
- Disabled state support
