import { ColumnType } from './interface'
import { INTERNAL_COL_DEFINE } from './utils/legacyUtil'

export interface ColGroupProps<RecordType> {
	colWidths: readonly (string | number)[]
	columns?: readonly ColumnType<RecordType>[]
	columnsCount?: number
}

function ColGroup<RecordType>({
	colWidths,
	columns,
	columnsCount
}: ColGroupProps<RecordType>) {
	const cols = []
	const len = columnsCount || columns.length
	let mustInsert = false
	for (let i = len - 1; i >= 0; i -= 1) {
		const width = colWidths[i]
		const column = columns && columns[i]
		const additionalProps = column && column[INTERNAL_COL_DEFINE]

		if (width || additionalProps || mustInsert) {
			cols.unshift(
				<col
					key={i}
					style={{ width: typeof width === 'number' ? `${width}px` : width }}
					{...additionalProps}
				/>
			)
			mustInsert = true
		}
	}
	return <colgroup>{cols}</colgroup>
}

export default ColGroup
