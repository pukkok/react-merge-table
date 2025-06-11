import React, { isValidElement, cloneElement } from 'react'
import { Cell, KeyedValue } from '../types/Cell'

type Props = {
  cell: Cell
  rowIndex?: number
  colIndex?: number
  defaultStyle?: boolean
  columnRenderers?: Record<number, (cell: Cell) => React.ReactNode>
} & React.TdHTMLAttributes<HTMLTableCellElement>

export const TableCell = ({
  cell,
  rowIndex,
  colIndex,
  columnRenderers,
  defaultStyle = true,
  style,
  ...rest
}: Props) => {
  const renderer = columnRenderers?.[cell.colIndex]
  const renderResult = renderer?.(cell)

  const isRawElement =
    isValidElement(renderResult) &&
    (renderResult.type === 'td' || renderResult.type === 'th')

  if (isRawElement) {
    const element = renderResult as React.ReactElement<any>
    return cloneElement(element, {
      rowSpan: cell.rowspan,
      colSpan: cell.colspan,
      ...element.props,
    })
  }

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
      {renderResult ?? renderContent(cell.content)}
    </td>
  )
}

function renderContent(value: KeyedValue | KeyedValue[]) {
  if (Array.isArray(value)) {
    console.log(value)
    return (
      <div>
        {value.map(v => (
          <p key={v.key}>{v.label}</p>
        ))}
      </div>
    )
  }

  return <span>{value.label}</span>
}
