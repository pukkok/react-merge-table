import React from 'react'
import styles from '../styles/table.module.css'
import { Cell } from '../types/Cell'
import { TableRow } from './TableRow'
import { parseRowsToMatrix } from '../utils/parseRowsToMatrix'

type Props = {
  rows: (string | number | (string | number)[])[][]
  columnRenderers?: Record<number, (cell: Cell) => React.ReactNode>
} & React.HTMLAttributes<HTMLTableSectionElement>

export const TableBody = ({ rows, columnRenderers, className, ...rest }: Props) => {
  const matrix = parseRowsToMatrix(rows)

  return (
    <tbody className={className} {...rest}>
      {matrix.map((row, rowIndex) => (
        <TableRow
          key={rowIndex}
          row={row}
          rowIndex={rowIndex}
          columnRenderers={columnRenderers}
        />
      ))}
    </tbody>
  )
}
