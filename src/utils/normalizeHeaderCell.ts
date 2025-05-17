import { HeaderCell } from '../types/Header'

export type NormalizedHeader = { key: string; label: string | number }

export function normalizeHeaderCell(
  input: HeaderCell,
  index: number
): NormalizedHeader {
  if (typeof input === 'string' || typeof input === 'number') {
    return { key: `$HEADER-${index}`, label: input }
  }
  return input
}