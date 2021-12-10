import { defineComponent, HTMLAttributes } from 'vue'
import classNames from '../../_util/classNames'
import {
	CellType,
	ColumnType,
	CustomizeComponent,
	DataIndex,
	DefaultRecordType
} from '../interface'
import { getPathValue, validateValue } from '../utils/valueUtil'

export interface CellProps<RecordType = DefaultRecordType> {
	prefixCls?: string
	record?: RecordType
	index?: number
	dataIndex?: DataIndex
	customRender?: ColumnType<RecordType>['customRender']

	component?: CustomizeComponent
	colSpan?: number
	rowSpan?: number

	additionalProps?: HTMLAttributes

	cellType?: 'header' | 'body'
	rowType?: 'header' | 'body' | 'footer'

	column?: ColumnType<RecordType>
}

export default defineComponent<CellProps<any>>({
	name: 'Cell',
	props: [
		'prefixCls',
		'component',
		'record',
		'index',
		'dataIndex',
		'customRender',
		'colSpan',
		'rowSpan',
		'additionalProps',
		'cellType',
		'rowType',
		'column'
	] as any,
	setup(props, { slots }) {
		return () => {
			const {
				prefixCls,
				component: Component = 'td',
				additionalProps = {},
				cellType,
				column = {},
				dataIndex,
				customRender,
				record,
				index,
				rowSpan,
				colSpan
			} = props
			const cellPrefixCls = `${prefixCls}-cell`
			let cellProps: CellType
			let childNode
			const children = slots.default?.()
			if (validateValue(children) || cellType === 'header') {
				childNode = children
			} else {
				// cellType = 'body
				const value = getPathValue(record, dataIndex)
				childNode = value
			}

			const componentProps = {
				...additionalProps,
				colSpan,
				rowSpan,
				class: classNames(cellPrefixCls, {}, additionalProps.class)
			}
			return (
				<Component {...componentProps}>
					{childNode}
					{slots.dragHandle?.()}
				</Component>
			)
		}
	}
})
