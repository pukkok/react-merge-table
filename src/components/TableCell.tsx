import React from 'react'
import { Cell } from '@/types/Cell'

type Props = {
  cell: Cell
  onClick?: (value: string) => void
}

export const TableCell = ({ cell, onClick }: Props) => {
  return (
    <td
      rowSpan={cell.rowspan}
      colSpan={cell.colspan}
      onClick={() => onClick?.(cell.value)}
      style={{
        border: '1px solid #ccc',
        padding: '8px',
        textAlign: 'center'
      }}
    >
      {cell.value}
    </td>
  )
}