export type HeaderCell =
  | string
  | number
  | {
      key: string
      label: string | number
    }