import React from 'react'
import { Cell } from '@/types/Cell'
import { TableRow } from '@/components/TableRow'

type Props = {
  matrix: Cell[][]
  onCellClick?: (value: string) => void
}

export const TableBody = ({ matrix, onCellClick }: Props) => {
  return (
    <tbody>
      {matrix.map((row, rowIndex) => (
        <TableRow key={rowIndex} row={row} onCellClick={onCellClick} />
      ))}
    </tbody>
  )
}
