export interface Cell {
  value: string | string[]
  rowspan: number
  colspan: number
  render: boolean
  colIndex: number
  rowIndex: number
}
