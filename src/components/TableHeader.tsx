import React from 'react'

type Props = {
  headers: string[]
} & React.HTMLAttributes<HTMLTableSectionElement>

export const TableHeader = ({ headers, ...rest }: Props) => {
  return (
    <thead {...rest}>
      <tr>
        {headers.map((text, idx) => (
          <th key={idx}>
            {text}
          </th>
        ))}
      </tr>
    </thead>
  )
}
