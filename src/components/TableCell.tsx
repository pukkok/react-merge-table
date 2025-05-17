import React from 'react'
import { Cell, KeyedValue } from '../types/Cell'

type Props = {
  cell: Cell
  rowIndex?: number // 내부에서만 사용, DOM으로 전달되지 않게
  colIndex?: number // 내부에서만 사용
  defaultStyle?: boolean
  columnRenderers?: Record<number, (cell: Cell) => React.ReactNode>
} & React.TdHTMLAttributes<HTMLTableCellElement>

export const TableCell = ({
  cell,
  rowIndex, // 구조 분해로 제거 (DOM에 전달 안 됨)
  colIndex, // 구조 분해로 제거 
  columnRenderers,
  defaultStyle = true,
  style,
  ...rest
}: Props) => {
  const custom = columnRenderers?.[cell?.colIndex]

  const tdStyle = {
    border: '1px solid #ccc',
    padding: '8px',
    textAlign: 'center',
    verticalAlign: 'middle',
  } satisfies React.CSSProperties

  const mergedStyle = defaultStyle ? { ...tdStyle, ...style } : style

  return (
    <td
      rowSpan={cell.rowspan}
      colSpan={cell.colspan}
      style={mergedStyle}
      {...rest}
    >
      {custom ? custom(cell) : renderContent(cell.content)}
    </td>
  )
}

function renderContent(value: KeyedValue | KeyedValue[]) {
  if (Array.isArray(value)) {
    return (
      <div>
        {value.map(v => (
          <p key={v.key}>
            {v.label}
          </p>
        ))}
      </div>
    )
  }

  return <span>{value.label}</span>
}
