import { KeyedValue } from '../types/Cell'

//INFO: 고유한 key 생성을 위한 전역 ID 카운터
let globalKeyId = 0

/**
 * string 또는 number 값을 KeyedValue 형식으로 변환합니다.
 */
function toKeyed(label: string | number): KeyedValue {
  return {
    key: `$CELL-${globalKeyId++}`,
    label
  }
}

/**
 * 배열이 KeyedValue[] 타입인지 확인합니다.
 */
function isKeyedValueArray(value: any[]): value is KeyedValue[] {
  return (
    value.length > 0 &&
    typeof value[0] === 'object' &&
    value[0] !== null &&
    'key' in value[0] &&
    'label' in value[0]
  )
}

/**
 * 값이 KeyedValue 타입인지 확인합니다.
 */
function isKeyedValue(value: any): value is KeyedValue {
  return (
    typeof value === 'object' &&
    value !== null &&
    'key' in value &&
    'label' in value
  )
}

/**
 * 특수 문자($$, ~~)를 해석하여 실제 표시값으로 변환합니다.
 */
function interpretLabel(label: string | number): string | number {
  //INFO: "$$"는 "$"로, "~~"는 "~"로 변환
  if (label === '$$') return '$'
  if (label === '~~') return '~'
  return label
}

/**
 * 다양한 셀 입력값을 KeyedValue[] 형식으로 표준화합니다.
 * 항상 배열을 반환합니다.
 */
export function normalizeCellContent(input: any): KeyedValue[] {
  //INFO: 배열인 경우
  if (Array.isArray(input)) {
    //INFO: 이미 KeyedValue[] 타입이면 label만 해석해서 반환
    if (isKeyedValueArray(input)) {
      return input.map(({ key, label }) => ({
        key,
        label: interpretLabel(label)
      }))
    } else {
      //INFO: 일반 배열이면 각 항목을 새 KeyedValue로 변환
      return input.map(v => toKeyed(interpretLabel(v)))
    }
  }

  //INFO: 단일 KeyedValue 객체인 경우 label만 해석해서 배열로 감싸 반환
  if (isKeyedValue(input)) {
    return [{
      key: input.key,
      label: interpretLabel(input.label)
    }]
  }

  //INFO: 나머지는 새 KeyedValue로 변환하여 배열로 감싸 반환
  return [toKeyed(interpretLabel(input))]
}
