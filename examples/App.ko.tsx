import React from 'react'
import { MergeTable, TableHeader, TableBody, Cell } from '@/index'
import './example.css'

const headers = [
  { key: 'grade', label: '학년' },
  '과목',
  { key: 'exam-type', label: '시험명' },
  '일정',
  '시간',
  '점수'
]

const rows = [
  {
    key: 'grade-1-math',
    data: [
      { key: 'grade-1', label: '1학년' },
      '수학',
      { key: 'exam-mid', label: '중간고사' },
      '4월 10일',
      '1교시',
      95
    ]
  },
  ['$', { key: 'subject-kor', label: '국어' }, '중간고사', ['4월 11일', '4월 12일'], '2교시', 87],
  ['$', '영어', '기말고사', '6월 15일', '1교시', 91],
  [
    '2학년',
    '수학',
    { key: 'exam-mid-2', label: '중간고사' },
    '4월 12일',
    '1교시',
    80
  ],
  ['$', '국어', '~', [{ key: 'date-1', label: '4월 13일' }, { key: 'date-2', label: '4월 14일' }], '2교시', 85],
  ['$', '영어', '~', '4월 14일', '3교시', 89]
]

export default function App() {
  return (
    <div className="example">
      <h1>🧩 자동 테이블 병합 예시(한글)</h1>

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
              <span style={{ fontWeight: 600 }}>{cell.content.label}점</span>
          }}
        />
      </MergeTable>
    </div>
  )
}
