import { Cell } from '../types/Cell'

const MERGE_DOWN = '$'
const MERGE_RIGHT = '~'
const ESCAPE_DOLLAR = '$$'
const ESCAPE_TILDE = '~~'

export function parseRowsToMatrix(rows: (string | number | (string | number)[])[][]): Cell[][] {
  const height = rows.length
  const width = Math.max(...rows.map(row => row.length))

  const grid: (Cell | null)[][] = Array.from({ length: height }, () =>
    Array.from({ length: width }, () => null)
  )

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const raw = rows[y]?.[x] ?? ''
      const value = Array.isArray(raw) ? raw : interpretValue(raw)

      if (raw === MERGE_DOWN || raw === MERGE_RIGHT) {
        grid[y][x] = null
      } else {
        grid[y][x] = {
          value,
          rowspan: 1,
          colspan: 1,
          render: true,
          colIndex: x,
          rowIndex: y
        }
      }
    }
  }

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const cell = grid[y][x]
      if (!cell || !cell.render) continue

      // 병합 ↓
      let r = y + 1
      while (r < height && rows[r]?.[x] === MERGE_DOWN) {
        cell.rowspan += 1
        grid[r][x] = { ...cell, render: false }
        r++
      }

      // 병합 →
      let c = x + 1
      while (c < width && rows[y]?.[c] === MERGE_RIGHT) {
        cell.colspan += 1
        grid[y][c] = { ...cell, render: false }
        c++
      }
    }
  }

  return grid.map(row =>
    row.filter(cell => cell !== null && cell.render !== false) as Cell[]
  )
}

function interpretValue(raw: string | number): string | number {
  if (typeof raw === 'string') {
    if (raw === ESCAPE_DOLLAR) return '$'
    if (raw === ESCAPE_TILDE) return '~'
  }
  return raw
}