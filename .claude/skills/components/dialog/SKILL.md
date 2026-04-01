---
name: f-rha-dialog
description: Use when the user wants to use, customize, or ask about the Dialog component from the f-rha library. Covers open/close control, title, body content, footer actions, width customization, overlay click and Escape key to close.
---

# Dialog — f-rha

A modal dialog component. Closes on overlay click or Escape key.

## Props

| Prop       | Type          | Default   | Description                                                          |
|------------|---------------|-----------|----------------------------------------------------------------------|
| `open`     | `boolean`     | `false`   | Controls dialog visibility                                           |
| `onClose`  | `() => void`  | —         | Called when overlay or close button is clicked, or Escape is pressed |
| `title`    | `string`      | —         | Dialog header title                                                  |
| `children` | `ReactNode`   | —         | Dialog body content                                                  |
| `footer`   | `ReactNode`   | —         | Dialog footer content (e.g. action buttons)                          |
| `width`    | `string`      | `"480px"` | Dialog width (any valid CSS value)                                   |

## Usage

```jsx
import { Dialog, Button } from "f-rha";

const [open, setOpen] = useState(false);

<Button onClick={() => setOpen(true)}>Open Dialog</Button>

<Dialog
  open={open}
  onClose={() => setOpen(false)}
  title="Confirm Action"
  footer={
    <>
      <Button variant="secondary" onClick={() => setOpen(false)}>Cancel</Button>
      <Button onClick={() => setOpen(false)}>Confirm</Button>
    </>
  }
>
  Are you sure you want to continue?
</Dialog>
```

## Changelog

### 1.0.0
- Initial release
- Overlay click and Escape key to close
- Configurable width, title, footer
