import { CSSProperties, defineComponent, HTMLAttributes, isVNode } from 'vue'
import classNames from '../../_util/classNames'
import { isValidElement } from '../../_util/props-util'
import {
	AlignType,
	CellEllipsisType,
	CellType,
	ColumnType,
	CustomizeComponent,
	DataIndex,
	DefaultRecordType,
	RenderedCell
} from '../interface'
import { getPathValue, validateValue } from '../utils/valueUtil'

function isRenderCell<RecordType = DefaultRecordType>(
	data: RenderedCell<RecordType>
): data is RenderedCell<RecordType> {
	return (
		data &&
		typeof data === 'object' &&
		!Array.isArray(data) &&
		!isValidElement(data)
	)
}

export interface CellProps<RecordType = DefaultRecordType> {
	prefixCls?: string
	record?: RecordType
	index?: number
	dataIndex?: DataIndex
	customRender?: ColumnType<RecordType>['customRender']
	align?: AlignType
	ellipsis?: CellEllipsisType

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
		'column',
		'align',
		'ellipsis'
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
				colSpan,
				align,
				ellipsis,
				rowType
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

				if (customRender) {
					const renderData = customRender({
						text: value,
						value,
						record,
						index,
						column: column.__originColumn__
					})
					if (isRenderCell(renderData)) {
						childNode = renderData.children
						cellProps = renderData.props
					} else {
						childNode = renderData
					}
				}
			}

			const {
				colSpan: cellColSpan,
				rowSpan: cellRowSpan,
				style: cellStyle,
				class: cellClassName,
				...restCellProps
			} = cellProps || {}
			const mergedColSpan = cellColSpan !== undefined ? cellColSpan : colSpan
			const mergedRowSpan = cellRowSpan !== undefined ? cellRowSpan : rowSpan

			if (mergedColSpan === 0 || mergedRowSpan === 0) {
				return null
			}

			// =========================ALign  =======================
			const alignStyle: CSSProperties = {}
			if (align) {
				alignStyle.textAlign = align
			}

			// ======================== Render =============================
			let title: string
			const ellipsisConfig: CellEllipsisType =
				ellipsis === true ? { showTitle: true } : ellipsis
			if (
				ellipsisConfig &&
				(ellipsisConfig.showTitle || rowType === 'header')
			) {
				if (typeof childNode === 'string' || typeof childNode === 'number') {
					title = childNode.toString()
				} else if (
					isVNode(childNode) &&
					typeof childNode.children === 'string'
				) {
					title = childNode.children
				}
			}

			const componentProps = {
				title,
				...additionalProps,
				...restCellProps,
				colSpan: mergedColSpan && mergedColSpan !== 1 ? mergedColSpan : null,
				rowSpan: mergedRowSpan && mergedRowSpan !== 1 ? mergedRowSpan : null,
				class: classNames(cellPrefixCls, {
					[`${cellPrefixCls}-ellipsis`]: ellipsis
				}, additionalProps.class),
				style: {
					...cellStyle,
					...alignStyle
				}
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
