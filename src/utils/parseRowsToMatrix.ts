import { Row } from '../types/Row'
import { Cell } from '../types/Cell'
import { normalizeCellContent } from './normalizeCellContent'

/**
 * Row[] 데이터를 2차원 Cell[][] 행렬로 변환하고, 셀 병합 정보(rowspan, colspan)를 계산합니다.
 */
export function parseRowsToMatrix(rows: Row[]): Cell[][] {
  //INFO: 셀 내용(content)을 normalize하여 KeyedValue 또는 KeyedValue[]로 변환한 원시 데이터 생성
  const raw = rows.map(row =>
    row.data.map(normalizeCellContent)
  )

  //INFO: 각 셀에 위치 및 병합 정보 포함한 Cell 객체로 변환
  const matrix: Cell[][] = raw.map((row, rowIndex) =>
    row.map((content, colIndex) => ({
      value: rows[rowIndex].data[colIndex], // 원래의 셀 값
      content,                              // normalize된 KeyedValue 또는 배열
      rowspan: 1,
      colspan: 1,
      render: true,                         // 렌더링 여부
      rowIndex,
      colIndex,
    }))
  )

  //INFO: 병합 문자('$', '~') 기반으로 rowspan, colspan 처리
  for (let rowIndex = 0; rowIndex < matrix.length; rowIndex++) {
    for (let colIndex = 0; colIndex < matrix[rowIndex].length; colIndex++) {
      const cell = matrix[rowIndex][colIndex]
      if (!cell.render) continue // 이미 병합된 셀은 건너뜀

      //INFO: 셀 내용의 첫 label을 추출
      const first = Array.isArray(cell.content)
        ? cell.content[0]?.label
        : cell.content.label

      //INFO: '$' → 위쪽 셀과 세로 병합 (rowspan 증가)
      if (first === '$' && rowIndex > 0) {
        for (let i = rowIndex - 1; i >= 0; i--) {
          const target = matrix[i][colIndex]
          const tFirst = Array.isArray(target.content)
            ? target.content[0]?.label
            : target.content.label

          //INFO: 병합 대상이 병합 문자('$')가 아닌 첫 셀인 경우 병합 처리
          if (target.render && tFirst !== '$') {
            target.rowspan++
            cell.render = false // 현재 셀은 렌더링하지 않음 (병합됨)
            break
          }
        }
      }

      //INFO: '~' → 왼쪽 셀과 가로 병합 (colspan 증가)
      else if (first === '~' && colIndex > 0) {
        for (let j = colIndex - 1; j >= 0; j--) {
          const target = matrix[rowIndex][j]
          const tFirst = Array.isArray(target.content)
            ? target.content[0]?.label
            : target.content.label

          //INFO: 병합 대상이 병합 문자('~')가 아닌 첫 셀인 경우 병합 처리
          if (target.render && tFirst !== '~') {
            target.colspan++
            cell.render = false // 현재 셀은 렌더링하지 않음 (병합됨)
            break
          }
        }
      }
    }
  }

  return matrix
}
