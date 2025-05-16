type Props = {
  headers: (string | number)[]
  defaultStyle?: boolean
} & React.HTMLAttributes<HTMLTableSectionElement>

export const TableHeader = ({ headers, defaultStyle = true, style, ...rest }: Props) => {
  const thStyle = {
    border: '1px solid #ccc',
    backgroundColor: '#f9f9f9',
    padding: '8px',
    textAlign: 'center',
    fontWeight: 'bold',
  } satisfies React.CSSProperties

  const mergedStyle = defaultStyle
    ? { ...thStyle, ...style }
    : style

  return (
    <thead {...rest}>
      <tr>
        {headers.map((text, idx) => (
          <th key={idx} style={mergedStyle}>
            {text}
          </th>
        ))}
      </tr>
    </thead>
  )
}
