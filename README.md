# 🧩 Auto Merge Table

**Auto Merge Table** is a lightweight React component that makes it easy to build `<table>`s with automatic cell merging.

> Sick of dealing with `rowspan`, `colspan`, and repetitive `<td>` logic in React?
> Just write your data and let this table handle the merging.

---

## 🔍 Live Demo

👉 [Try it now on GitHub Pages](https://pukkok.github.io/auto-merge-table/)

This interactive playground lets you edit `headers` and `rows` live and see the results immediately — perfect for testing before installing.

---

## ✨ Why I Built This

Writing `<table>` markup in React is tedious when you need to:

* Merge rows or columns
* Manually track rowspan/colspan
* Inject interactive components like buttons/inputs
* Maintain readable JSX

This component:

* Lets you use `$` for row-merge and `~` for col-merge
* Supports escape values (`$$`, `~~`)
* Automatically parses and applies merges
* Keeps full control of rendering per column

No boilerplate. Just define your `rows`, and go.

---

## 🚀 Quick Usage

```tsx
import {
  AutoMergeTable,
  TableHeader,
  TableBody,
  type Cell
} from 'auto-merge-table'

const headers = ['Grade', 'Subject', 'Exam', 'Date', 'Period', 'Score']

const rows = [
  ['Grade 1', 'Math', 'Midterm', 'April 10', 'Period 1', 95],
  ['$', 'Korean', 'Midterm', ['April 11', 'April 12'], 'Period 2', 87],
  ['$', 'English', 'Final', 'June 15', 'Period 1', 91],
  ['Grade 2', 'Math', 'Midterm', 'April 12', 'Period 1', 80],
  ['$', 'Korean', '~', 'April 13', 'Period 2', 85],
  ['$', 'English', '~', 'April 14', 'Period 3', 89]
]

<AutoMergeTable defaultStyle={false}>
  <TableHeader headers={headers} defaultStyle={false} />
  <TableBody
    rows={rows}
    columnRenderers={{
      0: (cell: Cell) => <strong>{cell.value}</strong>,
      1: (cell: Cell) =>
        cell.rowIndex === 2 && typeof cell.value === 'string'
          ? <input type="text" defaultValue={cell.value} />
          : <p>{cell.value}</p>,
      2: (cell: Cell) => (
        <div className="col-2">
          <p>{cell.value}</p>
        </div>
      ),
      3: (cell: Cell) =>
        Array.isArray(cell.value) ? (
          <div style={{ display: 'flex', gap: '4px', justifyContent: 'center' }}>
            {cell.value.map((v, i) => (
              <button key={i} className="example-button" onClick={() => alert(v)}>
                {v}
              </button>
            ))}
          </div>
        ) : (
          <em>{cell.value}</em>
        ),
      5: (cell: Cell) => <span style={{ fontWeight: 600 }}>{cell.value} pts</span>
    }}
  />
</AutoMergeTable>
```

---

## 🧠 Merge Syntax

| Symbol     | Meaning                                     |
| ---------- | ------------------------------------------- |
| `$`        | Merge with the cell above (↓ rowspan)       |
| `~`        | Merge with the cell to the left (→ colspan) |
| `$$`, `~~` | Escape literal `$` or `~` values            |

---

## 🎨 Styling with `defaultStyle`

The component provides optional default styling for `<table>`, `<th>`, and `<td>` elements.

By default, the style is enabled.
You can disable it by passing `defaultStyle={false}` to any of the components:

```tsx
<AutoMergeTable defaultStyle={false}>
  <TableHeader headers={headers} defaultStyle={false} />
  <TableBody rows={rows} defaultStyle={false} />
</AutoMergeTable>
```

This gives you full control to apply your own CSS classes without interference.

---

## 📋 Example Snippets

### 🇺🇸 English Example

```tsx
const headers = ['Grade', 'Subject', 'Exam', 'Date', 'Period', 'Score']

const rows = [
  ['Grade 1', 'Math', 'Midterm', 'April 10', 'Period 1', 95],
  ['$', 'Korean', 'Midterm', ['April 11', 'April 12'], 'Period 2', 87],
  ['$', 'English', 'Final', 'June 15', 'Period 1', 91],
  ['Grade 2', 'Math', 'Midterm', 'April 12', 'Period 1', 80],
  ['$', 'Korean', '~', 'April 13', 'Period 2', 85],
  ['$', 'English', '~', 'April 14', 'Period 3', 89]
]
```

### 🇰🇷 Korean Example

```tsx
const headers = ['학년', '과목', '시험명', '일정', '시간', '점수']

const rows = [
  ['1학년', '수학', '중간고사', '4월 10일', '1교시', 95],
  ['$', '국어', '중간고사', ['4월 11일', '4월 12일'], '2교시', 87],
  ['$', '영어', '기말고사', '6월 15일', '1교시', 91],
  ['2학년', '수학', '중간고사', '4월 12일', '1교시', 80],
  ['$', '국어', '~', '4월 13일', '2교시', 85],
  ['$', '영어', '~', '4월 14일', '3교시', 89]
]
```

---

## 📁 Project Structure

```
/src           → core component code
/examples      → demo apps
  ├── App.en.tsx  ← default demo (English)
  ├── App.ko.tsx  ← Korean demo
  └── main.tsx    ← demo entry
```

---

## 🌍 International Users

This project defaults to English examples.

If you're Korean, check out [`examples/App.ko.tsx`](./examples/App.ko.tsx) for localized usage.

---

## 📦 Installation (coming soon)

```bash
npm install auto-merge-table
# or
yarn add auto-merge-table
```

---

## 📊 Run the Example

This project includes complete example apps (English and Korean) under the `examples/` folder.

### 📁 Example Files

| File                   | Description                      |
| ---------------------- | -------------------------------- |
| `examples/App.en.tsx`  | English demo (default app)       |
| `examples/App.ko.tsx`  | Korean demo                      |
| `examples/main.tsx`    | React entry point (used by Vite) |
| `examples/example.css` | Custom styling for demo          |

### 🚀 Run the dev server

```bash
npm install
npm run dev
```

> This will start a local dev server using Vite at `http://localhost:5173`

To test the Korean version, change this line in `examples/main.tsx`:

```tsx
import App from './App.ko'
```

---

## 🇰🇷 한국어 안내

**Auto Merge Table**은 React에서 `<table>`을 쉽게 만들고, 자동 병합 기능을 지원하는 컴포넌트입니다.

`rowspan`, `colspan` 같은 셀 병합 처리를 자동으로 해주기 때문에,
복잡한 `<td>` 구조를 신경 쓰지 않고도 간단하게 테이블을 만들 수 있습니다.

### ✨ 만든 의도

* `rowspan`, `colspan`을 직접 계산하고 작성해야 함
* JSX가 다루기 어렵고 가독성이 낮음
* 커스텀 렌더링이 복잡해짐

→ 이 컴포넌트는 `$`, `~` 기호로 병합을 간단히 표현하고, 커스텀 렌더링도 손쉽게 할 수 있도록 설계되었습니다.

### 🚀 빠른 사용법

자세한 예제는 [`examples/App.ko.tsx`](./examples/App.ko.tsx)를 참고하세요.

### 🧠 병합 기호

| 기호         | 의미       |
| ---------- | -------- |
| `$`        | 위 셀과 병합  |
| `~`        | 왼쪽 셀과 병합 |
| `$$`, `~~` | 기호 자체 출력 |

💡 셀의 값이 정확히 `$` 또는 `~`인 경우에만 병합 명령으로 해석됩니다.

* `$`는 위쪽 셀과 병합 (rowspan)
* `~`는 왼쪽 셀과 병합 (colspan)

만약 `$` 또는 `~` 기호 자체를 **단독으로 표시**하고 싶다면 반드시 escape 문자를 사용해야 합니다:

* `$$` → `$` 출력
* `~~` → `~` 출력

그 외의 경우 (`$100`, `~100`, `가격 ~ 10% 할인` 등)는 자동으로 일반 문자열로 인식되므로 **추가적인 조치가 필요 없습니다.**

### 🎨 스타일 설정 (`defaultStyle`)

Auto Merge Table은 기본적으로 `<table>`, `<th>`, `<td>` 요소에 약간의 기본 스타일을 적용합니다. 하지만 이 스타일은 선택적으로 비활성화할 수 있습니다.

기본 스타일을 제거하고 직접 CSS를 적용하려면 `defaultStyle={false}`를 각 컴포넌트에 전달하세요:

```tsx
<AutoMergeTable defaultStyle={false}>
  <TableHeader headers={headers} defaultStyle={false} />
  <TableBody rows={rows} defaultStyle={false} />
</AutoMergeTable>
```

기본 스타일을 껐을 경우, `example.css` 또는 사용자 정의 스타일로 원하는 테이블 디자인을 자유롭게 설정할 수 있습니다.

---

### 🛠 예제 실행

```bash
npm install
npm run dev
```

`examples/main.tsx`에서 `App.ko.tsx`를 불러오면 한국어 예제를 실행할 수 있습니다:

```tsx
import App from './App.ko'
```

---

## 🙌 Contribute

Pull requests, feedback, and issue reports are welcome!

Feel free to contribute in English or Korean 🇰🇷.
