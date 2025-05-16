type Props = {
  children: React.ReactNode;
  className?: string;
  defaultStyle?: boolean;
} & React.TableHTMLAttributes<HTMLTableElement>;

export const AutoMergeTable = ({ children, className, defaultStyle = true, style, ...rest }: Props) => {
   const tableStyle = {
    borderCollapse: 'collapse',
    width: '100%',
  } satisfies React.CSSProperties;

  const mergedStyle = defaultStyle
    ? { ...tableStyle, ...style }
    : style;

  return (
    <table className={className} style={mergedStyle} {...rest}>
      {children}
    </table>
  );
};
