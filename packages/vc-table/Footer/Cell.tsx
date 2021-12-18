import { defineComponent } from 'vue'
import Cell from '../Cell'
import { useInjectSummary } from '../context/SummaryContext'
import { useInjectTable } from '../context/TableContext'
import { AlignType } from '../interface'

export interface SummaryCellProps {
	index: number
	colSpan?: number
	rowSpan?: number
	align?: AlignType
}

export default defineComponent<SummaryCellProps>({
	name: 'SummaryCell',
	inheritAttrs: false,
	props: ['index', 'colSpan', 'rowSpan', 'align'] as any,
	setup(props, { attrs, slots }) {
		const tableContext = useInjectTable()
		const summaryContext = useInjectSummary()
		return () => {
			const { index, colSpan, rowSpan, align } = props
			const { prefixCls } = tableContext
			return (
				<Cell
					class={attrs.class}
					index={index}
					prefixCls={prefixCls}
					component="td"
					record={null}
					dataIndex={null}
					customRender={() => ({
						children: slots.default?.(),
						props: {
							colSpan,
							rowSpan
						}
					})}
					align={align}
				/>
			)
		}
	}
})
