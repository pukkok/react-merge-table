export type KeyedValue = {
  key: string
  label: string | number
}

export type Cell = {
  value: unknown
  content: KeyedValue | KeyedValue[]
  rowspan: number
  colspan: number
  render: boolean
  rowIndex: number
  colIndex: number
}
