import { defineComponent } from 'vue'
import Cell from '../Cell'
import { useInjectTable } from '../context/TableContext'
import {
	CellType,
	ColumnType,
	CustomizeComponent,
	DefaultRecordType,
	GetComponentProps
} from '../interface'

export interface RowProps<RecordType = DefaultRecordType> {
	cells: readonly CellType<RecordType>[]
	// stickyOffsets:
	flattenColumns: readonly ColumnType<RecordType>[]
	rowComponent: CustomizeComponent
	cellComponent: CustomizeComponent
	customHeaderRow: GetComponentProps<readonly ColumnType<RecordType>[]>
	index: number
}

export default defineComponent<RowProps>({
	name: 'HeaderRow',
	props: [
		'flattenColumns',
		'rowComponent',
		'cellComponent',
		'customHeaderRow',
		'cells',
		'index'
	] as any,
	setup(props) {
		const tableContext = useInjectTable()
		return () => {
			const { prefixCls } = tableContext
			const {
				cells,
				flattenColumns,
				rowComponent: RowComponent,
				cellComponent: CellComponent
			} = props
			console.log(cells, 'cells')
			let rowProps
			return (
				<RowComponent {...rowProps}>
					{cells.map((cell, cellIndex) => {
						const { column } = cell
						return (
							<Cell
								{...cell}
								ellipsis={column.ellipsis}
								cellType="header"
								prefixCls={prefixCls}
								component={CellComponent}
								rowType="header"
								v-slots={{
									default: () => column.title
								}}
							/>
						)
					})}
				</RowComponent>
			)
		}
	}
})
