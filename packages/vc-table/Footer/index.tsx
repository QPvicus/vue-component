import { defineComponent } from 'vue'
import { FlattenColumns } from '../context/SummaryContext'
import { useInjectTable } from '../context/TableContext'
import { DefaultRecordType, StickyOffsets } from '../interface'
import SummaryRow from './Row'
import SummaryCell from './Cell'
export interface FooterProps<RecordType = DefaultRecordType> {
	stickyOffsets: StickyOffsets
	flattenColumns: FlattenColumns<RecordType>
}

export default defineComponent({
	name: 'Footer',
	inheritAttrs: false,
	props: ['stickyOffsets', 'flattenColumns'],
	setup(props, { slots }) {
		const tableContext = useInjectTable()
		return () => {
			const { prefixCls } = tableContext
			return <tfoot class={`${prefixCls}-summary`}>{slots.default?.()}</tfoot>
		}
	}
})

export { SummaryRow, SummaryCell }
