# 🎩 Auto Merge Table

**Auto Merge Table** is a lightweight React component that makes it easy to build `<table>`s with automatic cell merging.

> Sick of dealing with `rowspan`, `colspan`, and repetitive `<td>` logic in React?
> Just write your data and let this table handle the merging.

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

<AutoMergeTable>
  <TableHeader headers={headers} />
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

## 🗁 Project Structure

```
/src           → core component code
/examples      → demo apps
  ├— App.en.tsx  ← default demo (English)
  ├— App.ko.tsx  ← Korean demo
  └— main.tsx    ← demo entry
```

---

## 🌐 International Users

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

## 📃 License

MIT

---

## 📊 Run the Example

This project includes complete example apps (English and Korean) under the `examples/` folder.

### 📂 Example Files

| File                   | Description                      |
| ---------------------- | -------------------------------- |
| `examples/App.en.tsx`  | English demo (default app)       |
| `examples/App.ko.tsx`  | Korean demo                      |
| `examples/main.tsx`    | React entry point (used by Vite) |
| `examples/example.css` | Custom styling for demo          |

### 🚀 Run the dev server

If you're using this repo directly:

```bash
npm install
npm run dev
```

> This will start a local dev server using Vite at `http://localhost:5174`

By default, it loads the English demo (`App.en.tsx`).
To test the Korean version, just change this line in `examples/main.tsx`:

```tsx
// Before:
import App from './App.en'

// To use Korean version:
import App from './App.ko'
```

---

## 🇰🇷 Auto Merge Table (한국어 안내)

**Auto Merge Table**은 React에서 `<table>`을 더 쉽게 만들고, 자동 병합 기능을 지원하는 컨폰마트입니다.

`rowspan`, `colspan` 같은 셀 병합 처리를 자동으로 해주기 때문에,
보통의 `<td>` 구조를 신경 쓰지 않고도 간단하게 테이블을 만들 수 있습니다.

---

## ✨ 만들게 된 의도

<table> 태그를 React에서 쓰기 힘들어지는 이유:

* `rowspan`, `colspan`을 직접 계산하고 작성해야 함
* JSX가 다루지고 견도성이 상당히 낮음
* 버튼, 인프트, 커스텀 요소 렌더링이 기다리다는 문제

이 컨폰마트는 다음을 지원합니다:

* `$` → 위의 셀과 자동 병합
* `~` → 왼쪽 셀과 자동 병합
* `$$`, `~~` → 병합 기호 출력
* column 단위 렌더링 커스터링
* 타입 안정성, 유연한 스타일링

---

## 🚀 빠른 사용법

예제 사용 방식은 위의 영어 포함 포트를 참고해주세요.
examples/App.en.tsx -> examples/App.ko.tsx

---

## 🧠 병합 문법

| 기호         | 의미                |
| ---------- | ----------------- |
| `$`        | 위 셀과 병합           |
| `~`        | 왼쪽 셀과 병합          |
| `$$`, `~~` | `$`, `~` 기호 자체 출력 |

---

## 📂 폴더 구조

```
/src           → 라이브러리 해상 컨폰마트 코드
/examples      → 데모 예제
  ├— App.en.tsx  ← 기본 예제 (English)
  ├— App.ko.tsx  ← 한국어 예제
  └— main.tsx    ← 시험 진입건
```

---

## 📦 설치 방법 (coming soon)

```bash
npm install auto-merge-table
# 또는
yarn add auto-merge-table
```

---

## 💪 예제 실행 안내

이 프로젝트는 `examples/` 폴더에서 가장 완료된 예제 파일(App.en / App.ko)을 포함합니다.

### 포트 파일 구조

| 파일                     | 설명                    |
| ---------------------- | --------------------- |
| `examples/App.en.tsx`  | 영어 기본 예제              |
| `examples/App.ko.tsx`  | 한국어 예제                |
| `examples/main.tsx`    | React 시작 패스 (Vite 이용) |
| `examples/example.css` | 테이블 스타일 설정            |

### 연동환경 시작

```bash
npm install
npm run dev
```

> Vite 시바스 로컬 서버가 `http://localhost:5174` 에서 시작됩니다.

기본적으로 영어 예제(`App.en.tsx`)가 로드됩니다.
`examples/main.tsx`의 import 값을 `en` -> `ko`와 같이 변경하여 한국어 버전을 사용해 보세요.

```tsx
import App from './App.ko'
```

무료로 사용가능하고 전 기능은 App.ko.tsx에서도 동일히 다루고 있습니다.

---

## 🙌 Contribute

Pull requests, feedback, and issue reports are welcome!

Feel free to contribute in English or Korean 🇰🇷.
