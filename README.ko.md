# 🧩 React Merge Table

**React Merge Table**는 React에서 `<table>`을 시맨틱하게 구성하면서, 셀 병합(`rowspan`, `colspan`)을 자동으로 처리해주는 경량 컴포넌트입니다.

> `rowspan`, `colspan`, 조건부 `<td>` 렌더링에 지치셨나요?
> 데이터를 작성하기만 하면 병합은 이 컴포넌트가 알아서 처리합니다.

---

## ✅ 왜 React Merge Table을 써야 하나요?

기존 `div` 기반 테이블 구현과 달리, 이 컴포넌트는 **`<table>`\*\*\*\*, ****`<thead>`****, ****`<tbody>`****, ****`<td>`**** 등 시맨틱한 HTML 태그를 그대로 사용**합니다.

이로 인해 다음과 같은 이점을 얻을 수 있습니다:

* 접근성과 SEO에 유리한 HTML 구조
* 반복되는 값 자동 병합 (rowspan/colspan)
* 직관적인 문법과 최소한의 설정
* 각 열 별 커스텀 렌더링 지원

---

## 🔍 라이브 데모

👉 [GitHub Pages에서 체험하기](https://pukkok.github.io/react-merge-table/)

---

## 🚀 빠른 예제

다음은 `MergeTable`을 사용하는 가장 간단한 형태의 예제입니다. `columnRenderers`를 통해 특정 열 또는 행, 셀 위치에 따라 다양한 컴포넌트를 렌더링할 수 있습니다.

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
            <span style={{ fontWeight: 600 }}>{cell.content.label}점</span>
        }}
      />
    </MergeTable>
  )
}
```

---

## 🧠 병합 기호 문법

| 기호         | 의미                   |
| ---------- | -------------------- |
| `$`        | 위쪽 셀과 병합 (↓ rowspan) |
| `~`        | 왼쪽 셀과 병합 (→ colspan) |
| `$$`, `~~` | `$`, `~` 기호 자체 출력    |

💡 정확히 `$` 또는 `~`인 경우만 병합 처리됩니다. `'$100'`, `'가격~10%'` 같은 값은 일반 문자열로 처리됩니다.

## 🧾 `hasMultiple`, `content`, `contents` 설명

React Merge Table의 셀(Cell) 객체는 병합이나 렌더링에 필요한 정보를 다음과 같은 속성에 담고 있습니다:

### 🔹 `content`

* 단일 셀 값일 경우 렌더링에 사용되는 객체입니다.
* 형식: `{ key: string, label: string | number }`

```
cell.content.label // 화면에 출력할 값
cell.content.key   // 고유 식별자 (병합 및 리렌더링에 사용)
```

### 🔹 `contents`

* 셀에 여러 값을 배열로 표시해야 할 경우 사용됩니다.
* `Array<{ key, label }>` 형식으로 자동 정규화되며, 예: `['A', 'B']` → `[ { key: '0', label: 'A' }, { key: '1', label: 'B' } ]`

### 🔹 `hasMultiple`

* 셀이 다중 값(`contents`)을 가졌는지 여부를 나타내는 boolean입니다.
* 렌더링에서 버튼 리스트, 복수 항목 UI 등으로 활용할 수 있습니다.

```
cell.hasMultiple ? cell.contents.map(...) : cell.content.label
```

이러한 구조를 통해 columnRenderers에서 유연하고 위치 기반 조건 분기까지 처리할 수 있습니다.

지원하는 데이터 형식은 다음과 같습니다:

### 헤더 형식

* `string | number`
* `{ key: string, label: string | number }`

```tsx
const headers = [
  '학년',
  { key: 'subject', label: '과목' },
  '점수'
]
```

### 행 형식

* `CellValue[]` (기본 배열 형식)
* `{ key: string, data: CellValue[] }` (행 식별용 키 포함)

```tsx
const rows = [
  ['1학년', '수학', 95],
  ['$', '영어', 90],
  {
    key: 'g2-row',
    data: [
      { key: 'g2', label: '2학년' },
      '과학',
      88
    ]
  }
]
```

### 셀 값 형식

* `string | number`
* `{ key, label }`
* `Array<string | number>`
* `Array<{ key, label }>` – 다중 셀 출력용

자동으로 정규화되어 병합, 표시, 커스텀 렌더링 모두 지원됩니다.

---

## 🎨 스타일 제어: `defaultStyle`

기본적으로 `<table>`, `<th>`, `<td>`에 가벼운 스타일이 적용되어 있습니다. 직접 스타일링을 원한다면 `defaultStyle={false}`로 비활성화할 수 있습니다:

```tsx
<MergeTable defaultStyle={false}>
  <TableHeader headers={headers} defaultStyle={false} />
  <TableBody rows={rows} defaultStyle={false} />
</MergeTable>
```

클래스 기반 디자인 시스템, CSS 모듈 등 자유롭게 스타일을 적용하세요.

---

## 📦 설치

최신 버전 설치:

```bash
npm install react-merge-table
```

### 🔄 `auto-merge-table`에서 마이그레이션하기

이 패키지는 이전에 [`auto-merge-table`](https://www.npmjs.com/package/auto-merge-table)[이라는 이](https://www.npmjs.com/package/auto-merge-table)름으로 배포되었으며, 현재는 deprecated 되었습니다.

기존 사용자라면 다음 명령어로 이전 버전을 제거하고 새 패키지를 설치하세요:

```bash
npm uninstall auto-merge-table
npm install react-merge-table
```
