import React from 'react'
import { HeaderCell } from '../types/Header'
import { normalizeHeaderCell } from '../utils/normalizeHeaderCell'

type Props = {
  headers: HeaderCell[]
  defaultStyle?: boolean
} & React.HTMLAttributes<HTMLTableSectionElement>

export const TableHeader = ({ headers, defaultStyle = true, style, ...rest }: Props) => {
  const thStyle = {
    border: '1px solid #ccc',
    padding: '8px',
    textAlign: 'center',
    fontWeight: 'bold',
  } satisfies React.CSSProperties

  const mergedStyle = defaultStyle ? { ...thStyle, ...style } : style

  return (
    <thead {...rest}>
      <tr>
        {headers.map((header, index) => {
          //INFO: 헤더 값을 KeyedValue 형식으로 정규화
          const normalized = normalizeHeaderCell(header, index)
          return (
            <th key={normalized.key} style={mergedStyle}>
              {normalized.label}
            </th>
          )
        })}
      </tr>
    </thead>
  )
}
