import React from 'react'
import { parseRowsToMatrix } from '../utils/parseRowsToMatrix'
import { TableHeader } from '@/components/TableHeader'
import { TableBody } from '@/components/TableBody'

type Props = {
  headers: string[]
  rows: string[][]
  onCellClick?: (value: string) => void
}

export const AutoMergeTable = ({ headers, rows, onCellClick }: Props) => {
  const matrix = parseRowsToMatrix(rows)

  return (
    <table style={{ borderCollapse: 'collapse', width: '100%' }}>
      <TableHeader headers={headers} />
      <TableBody matrix={matrix} onCellClick={onCellClick} />
    </table>
  )
}