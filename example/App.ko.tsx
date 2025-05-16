import React from 'react'
import { AutoMergeTable, TableHeader, TableBody, Cell } from '@/index'
import './example.css'

const headers = ['학년', '과목', '시험명', '일정', '시간', '점수']

const rows = [
  ['1학년', '수학', '중간고사', '4월 10일', '1교시', 95],
  ['$', '국어', '중간고사', ['4월 11일', '4월 12일'], '2교시', 87],
  ['$', '영어', '기말고사', '6월 15일', '1교시', 91],
  ['2학년', '수학', '중간고사', '4월 12일', '1교시', 80],
  ['$', '국어', '~', '4월 13일', '2교시', 85],
  ['$', '영어', '~', '4월 14일', '3교시', 89]
]


export default function App() {
  return (
    <div className='example'>
      <h1>🧩 Auto Merge Table Example</h1>

      <AutoMergeTable>
        <TableHeader className='example-header' headers={headers} />

        <TableBody
          className='example-body'
          rows={rows}
          columnRenderers={{
            // [0] 학년 열: 병합된 학년을 강조 표시
            0: (cell: Cell) => <strong>{cell.value}</strong>,

            // [1] 과목 열: 특정 셀(row 2)에만 input 요소로 렌더
            1: (cell: Cell) =>
              cell.rowIndex === 2 &&
              (typeof cell.value === 'string' || typeof cell.value === 'number') ?
                <input type='text' defaultValue={cell.value} /> :
                <p>{cell.value}</p>,

            // [2] 시험명 열: 배경색 div로 감싸 렌더링
            2: (cell: Cell) => (
              <div className='col-2'>
                <p>{cell.value}</p>
              </div>
            ),

            // [3] 일정 열: 날짜가 배열인 경우 버튼 목록으로 출력
            3: (cell: Cell) =>
              Array.isArray(cell.value) ? (
                <div style={{ display : 'flex', gap: '4px', justifyContent: 'center' }}>
                  {cell.value.map((v, i) => (
                    <button
                      key={i}
                      className='example-button'
                      onClick={() => alert(v)}
                    >
                      {v}
                    </button>
                  ))}
                </div>
              ) : (
                <em>{cell.value}</em>
              ),

            // [5] 점수 열: 숫자 점수 강조 표시
            5: (cell: Cell) => <span style={{ fontWeight: 600 }}>{cell.value}점</span>
          }}
        />
      </AutoMergeTable>
    </div>
  )
}