import { defineComponent } from 'vue'
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
		const onClick = (event, ...args) => {
			console.log(event, args)
		}
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
						`${prefixCls}-row-level-${index}`
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
