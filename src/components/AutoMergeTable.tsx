import React from 'react'

type Props = {
  children: React.ReactNode
  className?: string
} & React.TableHTMLAttributes<HTMLTableElement>

export const AutoMergeTable = ({ children, className, ...rest }: Props) => {
  return (
    <table className={`table ${className ?? ''}`} {...rest}>
      {children}
    </table>
  )
}
