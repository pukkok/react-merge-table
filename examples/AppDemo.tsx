import { useState } from "react"
import { TablePreview } from "./TablePreview"
import { Sidebar } from "./Sidebar"
import "./example.css" // 필요한 경우
import { UsageGuide } from "./UsageGuide"

export default function AppDemo() {
  const defaultHeaders = ['Grade', 'Subject', 'Exam', 'Date', 'Period', 'Score']

  const defaultRows = [
    ['Grade 1', 'Math', 'Midterm', 'April 10', 'Period 1', 95],
    ['$', 'Korean', 'Midterm', ['April 11', 'April 12'], 'Period 2', 87],
    ['$', 'English', 'Final', 'June 15', 'Period 1', 91],
    ['Grade 2', 'Math', 'Midterm', 'April 12', 'Period 1', 80],
    ['$', 'Korean', '~', 'April 13', 'Period 2', 85],
    ['$', 'English', '~', 'April 14', 'Period 3', 89]
  ]

  const [headers, setHeaders] = useState<(string | number)[]>(defaultHeaders)
  const [rows, setRows] = useState<(string | number | (string | number)[])[][]>(defaultRows)

  return (
    <div className="container">
      <main>
        <TablePreview headers={headers} rows={rows} />
        <UsageGuide />
      </main>
      <Sidebar
        defaultHeaders={headers}
        defaultRows={rows}
        onApply={(newHeaders, newRows) => {
          setHeaders(newHeaders)
          setRows(newRows)
        }}
      />
    </div>
  )
}
