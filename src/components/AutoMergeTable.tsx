type Props = {
  children: React.ReactNode
  className?: string
} & React.TableHTMLAttributes<HTMLTableElement>

export const AutoMergeTable = ({ children, className, style, ...rest }: Props) => {
   const tableStyle = {
    borderCollapse: 'collapse',
    width: '100%',
  } satisfies React.CSSProperties

  const mergedStyle = { ...tableStyle, ...style }

  return (
    <table className={className} style={mergedStyle} {...rest}>
      {children}
    </table>
  )
}
