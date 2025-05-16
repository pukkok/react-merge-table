import { AutoMergeTable, TableHeader, TableBody } from "@/index"

type Props = {
  headers: (string | number)[],
  rows: (string | number | (string | number)[])[][]
}

export function TablePreview({ headers, rows } : Props)  {
  return (
    <>
      <h1>🧩 Auto Merge Table Playground</h1>
      <AutoMergeTable>
        <TableHeader className="example-header" defaultStyle={false} headers={headers} />
        <TableBody className="example-body" defaultStyle={false} rows={rows} />
      </AutoMergeTable>
    </>
  )
}