/**
 * parse columns and children into columns
 */

import { computed, Ref, watchEffect } from 'vue'
import {
	ColumnGroupType,
	ColumnsType,
	ColumnType,
	FixedType,
	GetRowKey
} from '../interface'
import { TableProps } from '../Table'

type TransformRef<T> = {
	[P in keyof T]: Ref<T[P]>
}
type UseColumnsProps<RecordType> = TransformRef<
	Pick<TableProps, 'prefixCls' | 'columns'> & {
		getRowKey: GetRowKey<RecordType>
	}
>

function flatColumns<RecordType>(
	columns: ColumnsType<RecordType>
): ColumnType<RecordType>[] {
	return columns.reduce((list, column) => {
		const { fixed } = column
		const parseFixed = fixed === true ? 'left' : fixed
		const subColumns = (column as ColumnGroupType<RecordType>).children
		if (subColumns && subColumns.length > 0) {
			return [
				...list,
				...flatColumns(subColumns).map((subColumn) => ({
					fixed: parseFixed,
					...subColumn
				}))
			]
		}
		return [
			...list,
			{
				...column,
				fixed: parseFixed
			}
		]
	}, [])
}

function warningFixed(flattenColumns: readonly { fixed?: FixedType }[]) {
	let allFixLeft = true
	for (let i = 0; i < flattenColumns.length; i += 1) {
		const col = flattenColumns[i]
		if (allFixLeft && col.fixed !== 'left') {
			allFixLeft = false
		} else if (!allFixLeft && col.fixed === 'left') {
			console.warn(
				`Index ${i - 1} of \` columns \` missing \` fixed = left  \` props`
			)
			break
		}
	}

	let allFixRight = true
	for (let i = flattenColumns.length - 1; i >= 0; i -= 1) {
		const col = flattenColumns[i]
		if (allFixRight && col.fixed !== 'right') {
			allFixRight = false
		} else if (!allFixRight && col.fixed === 'right') {
			console.warn(
				`Index ${i - 1} of \` columns \` missing \` fixed = right  \` props`
			)
			break
		}
	}
}

function useColumns<RecordType>({
	prefixCls,
	columns,
	getRowKey
}: UseColumnsProps<RecordType>) {
	const mergedColumns = computed(() => {
		let finalColumns = columns.value

		if (!finalColumns.length) {
			finalColumns = [{ customRender: () => null }]
		}
		return finalColumns
	})
	const flattenColumns = computed(() => {
		return flatColumns(columns.value)
	})

	console.log(flattenColumns.value, 'flattenColumns')
	watchEffect(() => {
		setTimeout(() => {
			warningFixed(flattenColumns.value)
		})
	})
	return [mergedColumns, flattenColumns] as const
}

export default useColumns
