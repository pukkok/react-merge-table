import React from 'react'
import { Cell } from '../types/Cell'
import { TableCell } from './TableCell'

type Props = {
  row: Cell[]
  rowIndex: number
  columnRenderers?: Record<number, (cell: Cell) => React.ReactNode>
} & React.HTMLAttributes<HTMLTableRowElement>

export const TableRow = ({ row, rowIndex, columnRenderers, ...rest }: Props) => {
  return (
    <tr {...rest}>
      {row.map((cell, colIndex) =>
        cell.render ? (
          <TableCell
            key={colIndex}
            cell={cell}
            rowIndex={rowIndex}
            colIndex={colIndex}
            columnRenderers={columnRenderers}
          />
        ) : null
      )}
    </tr>
  )
}
