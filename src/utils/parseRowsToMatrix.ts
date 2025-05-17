import { Row } from '../types/Row'
import { Cell } from '../types/Cell'
import { normalizeCellContent } from './normalizeCellContent'

/**
 * Row[] 데이터를 2차원 Cell[][] 행렬로 변환하고, 셀 병합 정보(rowspan, colspan)를 계산합니다.
 */
export function parseRowsToMatrix(rows: Row[]): Cell[][] {
  //INFO: 셀 내용(contents)을 KeyedValue[] 형식으로 정규화한 원시 데이터 생성
  const raw = rows.map(row =>
    row.data.map(normalizeCellContent)
  )

  //INFO: 각 셀에 위치 및 병합 정보 포함한 Cell 객체로 변환
  const matrix: Cell[][] = raw.map((row, rowIndex) =>
    row.map((contents, colIndex) => ({
      value: rows[rowIndex].data[colIndex],   // 원래의 셀 값
      content: contents[0],                   // 대표 값
      contents,                               // 전체 값 배열
      hasMultiple: contents.length > 1,       // 다중 값 여부
      rowspan: 1,
      colspan: 1,
      render: true,
      rowIndex,
      colIndex,
    }))
  )

  //INFO: 병합 문자('$', '~') 기반으로 rowspan, colspan 처리
  for (let rowIndex = 0; rowIndex < matrix.length; rowIndex++) {
    for (let colIndex = 0; colIndex < matrix[rowIndex].length; colIndex++) {
      const cell = matrix[rowIndex][colIndex]
      if (!cell.render) continue // 이미 병합된 셀은 건너뜀

      //INFO: 병합 판단을 위한 대표 label 추출
      const first = cell.content.label

      //INFO: '$' → 위쪽 셀과 세로 병합 (rowspan 증가)
      if (first === '$' && rowIndex > 0) {
        for (let i = rowIndex - 1; i >= 0; i--) {
          const target = matrix[i][colIndex]
          const tFirst = target.content.label

          if (target.render && tFirst !== '$') {
            target.rowspan++
            cell.render = false
            break
          }
        }
      }

      //INFO: '~' → 왼쪽 셀과 가로 병합 (colspan 증가)
      else if (first === '~' && colIndex > 0) {
        for (let j = colIndex - 1; j >= 0; j--) {
          const target = matrix[rowIndex][j]
          const tFirst = target.content.label

          if (target.render && tFirst !== '~') {
            target.colspan++
            cell.render = false
            break
          }
        }
      }
    }
  }

  return matrix
}
