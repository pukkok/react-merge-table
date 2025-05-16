import React from 'react'
import { AutoMergeTable, TableHeader, TableBody, Cell } from '@/index'
import './example.css'

const headers = ['Grade', 'Subject', 'Exam', 'Date', 'Period', 'Score']

const rows = [
  ['Grade 1', 'Math', 'Midterm', 'April 10', 'Period 1', 95],
  ['$', 'Korean', 'Midterm', ['April 11', 'April 12'], 'Period 2', 87],
  ['$', 'English', 'Final', 'June 15', 'Period 1', 91],
  ['Grade 2', 'Math', 'Midterm', 'April 12', 'Period 1', 80],
  ['$', 'Korean', '~', 'April 13', 'Period 2', 85],
  ['$', 'English', '~', 'April 14', 'Period 3', 89]
]

export default function App() {
  return (
    <div className="example">
      <h1>🧩 Auto Merge Table Example (English)</h1>

      <AutoMergeTable>
        <TableHeader className="example-header" headers={headers} />

        <TableBody
          className="example-body"
          rows={rows}
          columnRenderers={{
            // Grade column
            0: (cell: Cell) => <strong>{cell.value}</strong>,

            // Subject column: turn into input on row 2
            1: (cell: Cell) =>
              cell.rowIndex === 2 &&
              (typeof cell.value === 'string' || typeof cell.value === 'number') ? (
                <input type="text" defaultValue={cell.value} />
              ) : (
                <p>{cell.value}</p>
              ),

            // Exam column: with background styling
            2: (cell: Cell) => (
              <div className="col-2">
                <p>{cell.value}</p>
              </div>
            ),

            // Date column: render array as buttons
            3: (cell: Cell) =>
              Array.isArray(cell.value) ? (
                <div
                  style={{
                    display: 'flex',
                    gap: '4px',
                    justifyContent: 'center'
                  }}
                >
                  {cell.value.map((v, i) => (
                    <button
                      key={i}
                      className="example-button"
                      onClick={() => alert(v)}
                    >
                      {v}
                    </button>
                  ))}
                </div>
              ) : (
                <em>{cell.value}</em>
              ),

            // Score column: emphasize number
            5: (cell: Cell) => (
              <span style={{ fontWeight: 600 }}>{cell.value} pts</span>
            )
          }}
        />
      </AutoMergeTable>
    </div>
  )
}
