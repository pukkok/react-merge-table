> 🇰🇷 한글판 설명 바로가기: [README.ko.md](https://github.com/pukkok/react-merge-table/blob/main/README.ko.md)

# 🧩 React Merge Table

> 📦 This package was formerly published as auto-merge-table. Please use react-merge-table going forward.

**React Merge Table** is a lightweight React component that helps you build semantic `<table>`s in React with automatic cell merging.

> Tired of managing `rowspan`, `colspan`, and conditional `<td>` rendering? Just provide structured data—this component takes care of the merging.

---

## ✅ Why use React Merge Table?

Unlike custom `div`-based solutions, this component uses proper semantic HTML tags: **`<table>`**, **`<thead>`**, **`<tbody>`**, and **`<td>`**.

Benefits:

* Accessible, SEO-friendly HTML
* Automatically merges repeated values (`rowspan`, `colspan`)
* Simple syntax with minimal configuration
* Per-column custom rendering support

---

## 🔍 Live Demo

👉 [Try it on GitHub Pages](https://pukkok.github.io/react-merge-table/)

---

## 🚀 Quick Example

The following is a minimal example using `MergeTable`. You can apply custom rendering based on row or column position using `columnRenderers`.

```tsx
import React from 'react'
import { MergeTable, TableHeader, TableBody, Cell } from 'react-merge-table'
import './example.css'

const headers = ['Grade', 'Subject', 'Exam', 'Date', 'Period', 'Score']

const rows = [
  ['Grade 1', 'Math', 'Midterm', 'April 10', 'Period 1', 95],
  ['$', 'Korean', 'Midterm', ['April 11', 'April 12'], 'Period 2', 87],
  ['$', 'English', 'Final', 'June 15', 'Period 1', 91],
  ['Grade 2', 'Math', 'Midterm', 'April 12', 'Period 1', 80],
  ['$', 'Korean', '~', 'April 13', 'Period 2', 85],
  ['$', 'English', '~', 'April 14', 'Period 3', 89]
]

export default function App() {
  return (
    <MergeTable>
      <TableHeader headers={headers} />
      <TableBody
        rows={rows}
        columnRenderers={{
          0: (cell: Cell) => <strong>{cell.content.label}</strong>,

          1: (cell: Cell) =>
            cell.rowIndex === 2
              ? <input type="text" defaultValue={String(cell.content.label)} />
              : <p>{cell.content.label}</p>,

          3: (cell: Cell) =>
            cell.hasMultiple
              ? (
                <div style={{ display: 'flex', gap: '4px', justifyContent: 'center' }}>
                  {cell.contents.map((v) => (
                    <button
                      key={v.key}
                      className="example-button"
                      onClick={() => alert(v.label)}
                    >
                      {v.label}
                    </button>
                  ))}
                </div>
              ) : (
                <em>{cell.content.label}</em>
              ),

          5: (cell: Cell) =>
            <span style={{ fontWeight: 600 }}>{cell.content.label} pts</span>
        }}
      />
    </MergeTable>
  )
}
```

---

### Custom `<td>` or `<th>` rendering (v.1.1.0)

By default, **React Merge Table** wraps all cells in a `<td>` element for consistent rendering.

However, if your `columnRenderers` return a custom `<td>` or `<th>` directly, the component will use it as-is and **not wrap it again**.

```tsx
columnRenderers={{
  0: (cell) => <th style={{ background: '#f0f0f0' }}>{cell.content.label}</th>,
  1: (cell) => <td style={{ color: 'red' }}>{cell.content.label}</td>,
  2: (cell) => <strong>{cell.content.label}</strong> // ← automatically wrapped with <td>
}}
```

> 💡 If your renderer returns plain elements (like `<p>`, `<span>`, or raw text), they will be automatically wrapped with a `<td>`.

This gives you full control over the markup while keeping sensible defaults for simpler use cases.

---

## 🧠 Merge Syntax

| Symbol     | Meaning                                     |
| ---------- | ------------------------------------------- |
| `$`        | Merge with the cell above (↓ rowspan)       |
| `~`        | Merge with the cell to the left (→ colspan) |
| `$$`, `~~` | Escape literal `$` or `~` symbols           |

💡 Only exact values `$` or `~` trigger merging. Strings like `'$100'` or `'Save ~10%'` are treated as plain text.

---

## 🧾 Understanding `hasMultiple`, `content`, `contents`

Every `Cell` object contains rendering information and merge context:

### 🔹 `content`

* Used when the cell holds a single value.
* Format: `{ key: string, label: string | number }`

```ts
cell.content.label // display value
cell.content.key   // unique key (used for merging and keys)
```

### 🔹 `contents`

* Used when a cell holds multiple values (array).
* Automatically normalized into `{ key, label }[]`, e.g., `['A', 'B']` → `[{ key: '0', label: 'A' }, ...]`

### 🔹 `hasMultiple`

* Boolean indicating whether `contents` is used instead of `content`

```tsx
cell.hasMultiple ? cell.contents.map(...) : cell.content.label
```

---

## 📊 Supported Data Formats

### Header Format

* `string | number`
* `{ key: string, label: string | number }`

```tsx
const headers = [
  'Grade',
  { key: 'subject', label: 'Subject' },
  'Score'
]
```

### Row Format

* `CellValue[]` (simple array)
* `{ key: string, data: CellValue[] }` (row identified by key)

```tsx
const rows = [
  ['Grade 1', 'Math', 95],
  ['$', 'English', 90],
  {
    key: 'g2-row',
    data: [
      { key: 'g2', label: 'Grade 2' },
      'Science',
      88
    ]
  }
]
```

### Cell Value Format

* `string | number`
* `{ key, label }`
* `Array<string | number>`
* `Array<{ key, label }>` – for multi-value display

---

## 🎨 Table Styling

`<MergeTable>` applies the following table layout styles by default:

```css
border-collapse: collapse;
width: 100%;
```

It behaves just like a regular `<table>` tag and serves as a lightweight style wrapper.

If you want to disable the default styles on the header (`<TableHeader>`) or body (`<TableBody>`),
you can use the `defaultStyle={false}` prop on each component:

```tsx
<MergeTable>
  <TableHeader headers={headers} defaultStyle={false} />
  <TableBody rows={rows} defaultStyle={false} />
</MergeTable>
```

> 🧩 If you apply custom styles without setting `defaultStyle` to false, your styles will override the default styles in case of conflict.

You can freely customize the appearance using your own CSS classes or utility libraries like Tailwind.

---

## 📦 Installation

Install the latest version:

```bash
npm install react-merge-table
```

### 🔄 Migrating from `auto-merge-table`

This package was previously published as [`auto-merge-table`](https://www.npmjs.com/package/auto-merge-table) and is now deprecated.

To migrate:

```bash
npm uninstall auto-merge-table
npm install react-merge-table
```

---

## 📄 Changelog

See [CHANGELOG.md](https://github.com/pukkok/react-merge-table/blob/main/CHANGELOG.md) for version history and release notes.