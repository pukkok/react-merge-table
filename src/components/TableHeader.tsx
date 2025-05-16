import React from 'react'
import styles from '../styles/table.module.css'

type Props = {
  headers: string[]
} & React.HTMLAttributes<HTMLTableSectionElement>

export const TableHeader = ({ headers, className, ...rest }: Props) => {
  return (
    <thead className={className} {...rest}>
      <tr>
        {headers.map((text, idx) => (
          <th key={idx} className={styles.th}>
            {text}
          </th>
        ))}
      </tr>
    </thead>
  )
}
