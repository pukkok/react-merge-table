import React from 'react'
import { Cell } from '@/types/Cell'
import { TableCell } from '@/components/TableCell'

type Props = {
  row: Cell[]
  onCellClick?: (value: string) => void
}

export const TableRow = ({ row, onCellClick }: Props) => {
  return (
    <tr>
      {row.map((cell, idx) =>
        cell.render ? (
          <TableCell key={idx} cell={cell} onClick={onCellClick} />
        ) : null
      )}
    </tr>
  )
}