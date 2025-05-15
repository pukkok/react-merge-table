import React from 'react'

type Props = {
  headers: string[]
}

export const TableHeader = ({ headers }: Props) => {
  return (
    <thead>
      <tr>
        {headers.map((text, idx) => (
          <th
            key={idx}
            style={{
              border: '1px solid #ccc',
              backgroundColor: '#f9f9f9',
              padding: '8px',
              textAlign: 'center',
              fontWeight: 'bold'
            }}
          >
            {text}
          </th>
        ))}
      </tr>
    </thead>
  )
}