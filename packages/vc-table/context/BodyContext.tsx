import type { InjectionKey } from 'vue'
import { inject, provide } from 'vue'
import {
	ColumnsType,
	ColumnType,
	DefaultRecordType,
	RowClassName,
	TableLayout
} from '../interface'

export interface BodyContextProps<RecordType = DefaultRecordType> {
	rowClassName: string | RowClassName<RecordType>
	// expandedRowClassName: RowClassName<RecordType>

	columns: ColumnsType<RecordType>
	flattenColumns: readonly ColumnType<RecordType>[]

	componentWidth: number
	tableLayout: TableLayout
	// fixedHeader: boolean
	// fixColumn: boolean
	horizonScroll: boolean

	indentSize: number
}

export const BodyContextKey: InjectionKey<BodyContextProps> =
	Symbol('BodyContextProps')

export const useProvideBody = (props: BodyContextProps) => {
	provide(BodyContextKey, props)
}

export const useInjectBody = () => {
	return inject(BodyContextKey, {} as BodyContextProps)
}
