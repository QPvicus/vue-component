import { computed, defineComponent } from 'vue'
import classNames from '../../_util/classNames'
import { useInjectTable } from '../context/TableContext'
import {
	CellType,
	ColumnGroupType,
	ColumnsType,
	ColumnType,
	DefaultRecordType,
	GetComponentProps
} from '../interface'
import HeaderRow from './HeaderRow'

function parseHeaderRows<RecordType>(
	rootColumns: ColumnsType<RecordType>
): CellType<RecordType>[][] {
	const rows: CellType<RecordType>[][] = []

	function fillRowCells(
		columns: ColumnsType<RecordType>,
		colIndex: number,
		rowIndex = 0
	): number[] {
		rows[rowIndex] = rows[rowIndex] || []
		let currentColIndex = colIndex
		const colSpans: number[] = columns.filter(Boolean).map((column) => {
			const cell: CellType<RecordType> = {
				key: column.key,
				class: classNames(column.className, column.class),
				column,
				colStart: currentColIndex
			}
			let colSpan = 1
			const subColumns = (column as ColumnGroupType<RecordType>).children
			if (subColumns && subColumns.length > 0) {
				colSpan = fillRowCells(
					subColumns,
					currentColIndex,
					rowIndex + 1
				).reduce((total, count) => total + count, 0)
				cell.hasSubColumns = true
			}
			if ('colSpan' in column) {
				;({ colSpan } = column)
			}
			if ('rowSpan' in column) {
				cell.rowSpan = column.rowSpan
			}
			cell.colSpan = colSpan
			cell.colEnd = cell.colSpan + colSpan - 1
			rows[rowIndex].push(cell)

			currentColIndex += colSpan

			return colSpan
		})

		return colSpans
	}
	fillRowCells(rootColumns, 0)

	const rowCount = rows.length
	for (let rowIndex = 0; rowIndex < rowCount; rowIndex += 1) {
		rows[rowIndex].forEach((cell) => {
			if (!('rowSpan' in cell) && !cell.hasSubColumns) {
				cell.rowSpan = rowCount - rowIndex
			}
		})
	}

	return rows
}

export interface HeaderProps<RecordType = DefaultRecordType> {
	columns: ColumnsType<RecordType>
	flattenColumns: readonly ColumnType<RecordType>[]
	// stickyOffsets: StickyOffsets
	customHeaderRow: GetComponentProps<readonly ColumnType<RecordType>[]>
}

export default defineComponent<HeaderProps<any>>({
	name: 'Header',
	inheritAttrs: false,
	props: ['columns', 'flattenColumns', 'customHeaderRow'] as any,
	setup(props) {
		// debugger
		const rows = computed(() => parseHeaderRows(props.columns))
		const tableContext = useInjectTable()
		return () => {
			const { prefixCls, getComponent } = tableContext
			const { customHeaderRow } = props
			const WrapperComponent = getComponent(['header', 'wrapper'], 'thead')
			const trComponent = getComponent(['header', 'row'], 'tr')
			const thComponent = getComponent(['header', 'cell'], 'th')
			return (
				<WrapperComponent class={`${prefixCls}-thead`}>
					{rows.value.map((row, rowIndex) => {
						return (
							<HeaderRow
								cells={row}
								flattenColumns={row}
								rowComponent={trComponent}
								cellComponent={thComponent}
								index={rowIndex}
								key={rowIndex}
								customHeaderRow={customHeaderRow}
							/>
						)
					})}
				</WrapperComponent>
			)
		}
	}
})
