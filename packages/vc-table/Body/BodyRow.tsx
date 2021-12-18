import { computed, defineComponent } from 'vue'
import { CustomizeComponent, GetRowKey, Key } from '../interface'
import classNames from '../../_util/classNames'
import { useInjectTable } from '../context/TableContext'
import { useInjectBody } from '../context/BodyContext'
import Cell from '../Cell'
export interface BodyRowProps<RecordType> {
	record: RecordType
	index: number
	recordKey: Key
	// expandedKeys: Set<Key>
	rowComponent: CustomizeComponent
	cellComponent: CustomizeComponent
	// customRow:
	indent?: number
	rowKey: Key
	getRowKey: GetRowKey<RecordType>
}

export default defineComponent<BodyRowProps<any>>({
	name: 'BodyRow',
	inheritAttrs: false,
	props: [
		'record',
		'index',
		'recordKey',
		'rowComponent',
		'cellComponent',
		'indent',
		'rowKey',
		'getRowKey'
	] as any,
	setup(props, { attrs }) {
		const tableContext = useInjectTable()
		const bodyContext = useInjectBody()
		const onClick = (event, ...args) => {}
		const computedRowClassName = computed(() => {
			const { record, index, indent } = props
			console.log(record, index, indent)
			const { rowClassName } = bodyContext
			if (typeof rowClassName === 'string') {
				return rowClassName
			} else if (typeof rowClassName === 'function') {
				return rowClassName(record, index, indent)
			}
			return ''
		})
		computedRowClassName.value
		return () => {
			const { class: className, style } = attrs
			const { prefixCls } = tableContext
			const { flattenColumns } = bodyContext
			const {
				rowComponent: RowComponent,
				record,
				index,
				rowKey,
				indent = 0,
				cellComponent
			} = props
			const baseRowNode = (
				<RowComponent
					class={classNames(
						className,
						`${prefixCls}-row`,
						`${prefixCls}-row-level-${index}`,
						computedRowClassName.value
					)}
					style={style}
					onClick={onClick}
				>
					{flattenColumns.map((column, colIndex) => {
						const {
							customRender,
							dataIndex,
							className: columnClassName
						} = column
						return (
							<Cell
								cellType="body"
								class={columnClassName}
								component={cellComponent}
								prefixCls={prefixCls}
								ellipsis={column.ellipsis}
								dataIndex={dataIndex}
								record={record}
								customRender={customRender}
								column={column}
								key={colIndex}
							/>
						)
					})}
				</RowComponent>
			)
			return <>{baseRowNode}</>
		}
	}
})
