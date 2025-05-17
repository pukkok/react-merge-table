export type LabelObject = { key: string; label: string | number }

export type CellValue =
  | string
  | number
  | (string | number)[]
  | LabelObject[]

export type Row = {
  key: string
  data: CellValue[]
}
