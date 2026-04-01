---
name: f-rha-use-debounce
description: Use when the user wants to debounce a rapidly changing value (e.g. search input, resize events) to avoid excessive re-renders or API calls. Returns a delayed copy of the value that only updates after the specified delay.
---

# useDebounce — f-rha

Returns a debounced copy of a value that only updates after the given delay has passed without the value changing. Useful for search inputs, API calls, or expensive computations.

## Signature

```js
const debouncedValue = useDebounce(value, delay);
```

## Parameters

| Parameter | Type     | Default | Description                          |
|-----------|----------|---------|--------------------------------------|
| `value`   | `any`    | —       | The value to debounce                |
| `delay`   | `number` | `300`   | Delay in milliseconds                |

## Returns

The debounced value — same type as `value`, updated only after `delay` ms of inactivity.

## Usage

```jsx
import { useDebounce } from "f-rha";
import { useState, useEffect } from "react";

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
      placeholder="Search..."
    />
  );
}
```

## Changelog

### 1.0.0
- Initial release
- Clears timeout on value/delay change and on unmount
