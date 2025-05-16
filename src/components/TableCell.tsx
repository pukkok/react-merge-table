import React from 'react'
import { Cell } from '../types/Cell'

type Props = {
  cell: Cell
  rowIndex?: number // 내부에서만 사용, DOM으로 전달되지 않게
  colIndex?: number // 내부에서만 사용
  columnRenderers?: Record<number, (cell: Cell) => React.ReactNode>
} & React.TdHTMLAttributes<HTMLTableCellElement>

export const TableCell = ({
  cell,
  rowIndex, // 구조 분해로 제거 (DOM에 전달 안 됨)
  colIndex, // 구조 분해로 제거 
  columnRenderers,
  ...rest
}: Props) => {
  const custom = columnRenderers?.[cell?.colIndex]

  return (
    <td
      rowSpan={cell.rowspan}
      colSpan={cell.colspan}
      {...rest}
    >
      {custom ? custom(cell) : defaultRender(cell)}
    </td>
  )
}

function defaultRender(cell: Cell) {
  return Array.isArray(cell.value)
    ? cell.value.map((v, i) => <div key={i}>{v}</div>)
    : cell.value
}
