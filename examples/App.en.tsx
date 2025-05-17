import React from 'react'
import { MergeTable, TableHeader, TableBody, Cell } from '@/index'
import './example.css'

const headers = [
  { key: 'grade', label: 'Grade' },
  'Subject',
  { key: 'exam-type', label: 'Exam' },
  'Date',
  'Period',
  'Score'
]

const rows = [
  {
    key: 'grade-1-math',
    data: [
      { key: 'grade-1', label: 'Grade 1' },
      'Math',
      { key: 'exam-mid', label: 'Midterm' },
      'April 10',
      'Period 1',
      95
    ]
  },
  ['$', { key: 'subject-kor', label: 'Korean' }, 'Midterm', ['April 11', 'April 12'], 'Period 2', 87],
  ['$', 'English', 'Final', 'June 15', 'Period 1', 91],
  [
    'Grade 2',
    'Math',
    { key: 'exam-mid-2', label: 'Midterm' },
    'April 12',
    'Period 1',
    80
  ],
  ['$', 'Korean', '~', [{ key: 'date-1', label: 'April 13' }, { key: 'date-2', label: 'April 14' }], 'Period 2', 85],
  ['$', 'English', '~', 'April 14', 'Period 3', 89]
]

export default function App() {
  return (
    <div className="example">
      <h1>🧩 Auto Merge Table Example (English)</h1>

      <MergeTable>
        <TableHeader className="example-header" headers={headers} />

        <TableBody
          className="example-body"
          rows={rows}
          columnRenderers={{
            0: (cell: Cell) => <strong>{cell.content.label}</strong>,

            1: (cell: Cell) =>
              cell.rowIndex === 2
                ? <input type="text" defaultValue={String(cell.content.label)} />
                : <p>{cell.content.label}</p>,

            2: (cell: Cell) => <div className="col-2"><p>{cell.content.label}</p></div>,

            3: (cell: Cell) =>
              cell.hasMultiple
                ? (
                  <div style={{ display: 'flex', gap: '4px', justifyContent: 'center' }}>
                    {cell.contents.map((v) => (
                      <button
                        key={v.key}
                        className="example-button"
                        onClick={() => alert(v.label)}
                      >
                        {v.label}
                      </button>
                    ))}
                  </div>
                ) : (
                  <em>{cell.content.label}</em>
                ),

            5: (cell: Cell) =>
              <span style={{ fontWeight: 600 }}>{cell.content.label} pts</span>
          }}
        />
      </MergeTable>
    </div>
  )
}
