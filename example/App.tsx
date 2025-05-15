import React from 'react'
import { AutoMergeTable } from '../src/components/AutoMergeTable'

const headers = ['항목', '범위', '기관', '횟수', '시기']

const rows = [
  ['유치원 규칙·시설 등 기본현황', '가. 일반 현황', '~', '~', '~'],
  ['$', '1) 기관 기본현황', '전체', '연1회', '4월'],
  ['$', '2) 유치원 규칙', '전체', '수시', '수시'],
  ['교육과정 운영', '가. 교육과정 편성·운영', '~', '~', '~'],
  ['$', '1) 연간 교육계획', '전체', '연1회', '2월'],
  ['$', '2) 교육과정 편성표', '전체', '수시', '수시'],
  ['$', '3) 수업일수', '전체', '연1회', '2월']
]

export default function App() {
  return (
    <div style={{ padding: '24px' }}>
      <h1>🧩 Auto Merge Table Example</h1>
      <AutoMergeTable headers={headers} rows={rows} onCellClick={(val) => alert(val)} />
    </div>
  )
}