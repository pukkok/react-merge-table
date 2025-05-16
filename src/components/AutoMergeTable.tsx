import React from 'react'
import styles from '../styles/table.module.css'

type Props = {
  children: React.ReactNode
  className?: string
} & React.TableHTMLAttributes<HTMLTableElement>

export const AutoMergeTable = ({ children, className, ...rest }: Props) => {
  return (
    <table className={`${styles.table} ${className ?? ''}`} {...rest}>
      {children}
    </table>
  )
}
