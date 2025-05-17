import React from 'react'
import { Row, CellValue } from '../types/Row'
import { Cell } from '../types/Cell'
import { TableRow } from './TableRow'
import { parseRowsToMatrix } from '../utils/parseRowsToMatrix'

type TableBodyProps = {
  rows: any[] // INFO: 입력 받는 값은 유연하게 받는다.
  columnRenderers?: Record<number, (cell: Cell) => React.ReactNode>
  defaultStyle?: boolean
} & React.HTMLAttributes<HTMLTableSectionElement>

export const TableBody = ({
  rows,
  columnRenderers,
  defaultStyle = true,
  ...rest
}: TableBodyProps) => {
  // INFO: 입력 형식이 CellValue[]일 경우 자동으로 key를 생성하여 Row로 변환
  const normalizedRows: Row[] = rows.map((row, i) =>
    Array.isArray(row) ? { key: `row-${i}`, data: row } : row
  )

  // INFO: 병합 처리 및 value 정규화
  const matrix = parseRowsToMatrix(normalizedRows)

  return (
    <tbody {...rest}>
      {matrix.map((row, rowIndex) => (
        <TableRow
          key={normalizedRows[rowIndex].key}
          row={row}
          rowIndex={rowIndex}
          defaultStyle={defaultStyle}
          columnRenderers={columnRenderers}
        />
      ))}
    </tbody>
  )
}
