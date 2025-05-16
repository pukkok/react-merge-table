export interface Cell {
  value: string | number | (string | number)[]
  rowspan: number
  colspan: number
  render: boolean
  colIndex: number
  rowIndex: number
}
