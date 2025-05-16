import { useState } from 'react'

const docs = {
  en: {
    title: "🧩 How to use the playground",
    instructions: `
- You can edit the Headers and Rows in the panel on the right.
- Click "Run" to update the table below.
- Use special values:
  - "$" for merging down (rowspan)
  - "~" for merging right (colspan)
  - "$$", "~~" to escape them
- You can also use nested arrays for multiple values (e.g., ["April 11", "April 12"])
    `,
  },
  ko: {
    title: "🧩 플레이그라운드 사용법",
    instructions: `
- 우측 패널에서 Headers와 Rows를 수정할 수 있습니다.
- "Run" 버튼을 누르면 아래 테이블이 갱신됩니다.
- 특수 값 사용법:
  - "$": 아래로 병합 (rowspan)
  - "~": 오른쪽으로 병합 (colspan)
  - "$$", "~~": 기호 그대로 출력
- 배열을 사용하면 다중 값을 표현할 수 있습니다. (예: ["4월 11일", "4월 12일"])
    `,
  },
}

export function UsageGuide() {
  const [lang, setLang] = useState<'en' | 'ko'>('en')

  return (
    <div className="guide">
      <div className="guide-header">
        <h2>{docs[lang].title}</h2>
        <button className="guide-toggle-button" onClick={() => setLang(lang === 'en' ? 'ko' : 'en')}>
          {lang === 'en' ? '한국어 보기' : 'View in English'}
        </button>
      </div>
      <pre className="guide-instructions">
        {docs[lang].instructions}
      </pre>
    </div>
  )
}
