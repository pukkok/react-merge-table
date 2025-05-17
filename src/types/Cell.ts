export type KeyedValue = {
  key: string
  label: string | number
}

export type Cell = {
  value: unknown                // 원본 입력값
  content: KeyedValue           // 대표 값 (단일 렌더링용)
  contents: KeyedValue[]        // 전체 값 배열 (다중 렌더링용)
  hasMultiple: boolean              // contents가 복수인지 여부
  rowspan: number
  colspan: number
  render: boolean
  rowIndex: number
  colIndex: number
}