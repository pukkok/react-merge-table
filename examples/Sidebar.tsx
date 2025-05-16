import { useState } from "react"

type Props = {
  defaultHeaders: (string | number)[]
  defaultRows: (string | number | (string | number)[])[][]
  onApply: (
    headers: (string | number)[],
    rows: (string | number | (string | number)[])[][]
  ) => void
}

export function Sidebar({ defaultHeaders, defaultRows, onApply }: Props) {
  const formatRows = (rows: any[][]) =>
    '[\n' + rows.map(r => '  ' + JSON.stringify(r)).join(',\n') + '\n]'

  const [initialHeaderInput] = useState(JSON.stringify(defaultHeaders))
  const [initialRowInput] = useState(formatRows(defaultRows))

  const [headerInput, setHeaderInput] = useState(initialHeaderInput)
  const [rowInput, setRowInput] = useState(initialRowInput)
  const [error, setError] = useState<string | null>(null)

  const handleApply = () => {
    try {
      const parsedHeaders = JSON.parse(headerInput)
      const parsedRows = JSON.parse(rowInput)

      if (!Array.isArray(parsedHeaders) || !Array.isArray(parsedRows)) {
        throw new Error("Invalid format")
      }

      onApply(parsedHeaders, parsedRows)
      setError(null)
    } catch (err) {
      setError("The input format is invalid.")
    }
  }

  const handleReset = () => {
    setHeaderInput(initialHeaderInput)
    setRowInput(initialRowInput)
    setError(null)
    onApply(JSON.parse(initialHeaderInput), JSON.parse(initialRowInput))
  }

  return (
    <div className="sidebar">

      <h3>📥 Headers</h3>
      <textarea
        spellCheck={false}
        className="headers-textarea"
        rows={4}
        value={headerInput}
        onChange={(e) => setHeaderInput(e.target.value)}
      />
      
      <h3>📥 Rows</h3>
      <textarea
        spellCheck={false}
        className="rows-textarea"
        rows={16}
        value={rowInput}
        onChange={(e) => setRowInput(e.target.value)}
      />

      <div className="button-box">
        <button onClick={handleApply}>▶️ Run</button>
        <button onClick={handleReset}>🔄 Reset</button>
      </div>
      {error && <p style={{ color: "red", marginTop: 8 }}>{error}</p>}
    </div>
  )
}
