import { defineComponent, toRef } from 'vue'
import { useInjectTable } from '../context/TableContext'
import useFlattenRecords from '../hooks/useFlattenRecords'
import { GetRowKey } from '../interface'
import BodyRow from './BodyRow'

export interface BodyProps<RecordType> {
	data: RecordType[]
	getRowKey: GetRowKey<RecordType>
}

export default defineComponent<BodyProps<any>>({
	name: 'Body',
	props: ['data', 'getRowKey'] as any,
	slots: ['emptyNode'],
	setup(props) {
		const tableContext = useInjectTable()

		const flattenData = useFlattenRecords(toRef(props, 'data'))
		return () => {
			const { prefixCls, getComponent } = tableContext
			const { data, getRowKey } = props
			const WrapperComponent = getComponent(['body', 'wrapper'], 'tbody')
			const trComponent = getComponent(['body', 'row'], 'tr')
			const tdComponent = getComponent(['body', 'cell'], 'td')

			let rows
			if (data.length) {
				console.log('flattenData', flattenData.value)
				rows = flattenData.value.map((item, index) => {
					const { record, indent } = item
					const key = getRowKey(record, index)
					return (
						<BodyRow
							key={key}
							rowKey={key}
							record={record}
							recordKey={key}
							index={index}
							rowComponent={trComponent}
							cellComponent={tdComponent}
							indent={indent}
							getRowKey={getRowKey}
						/>
					)
				})
			} else {
				console.log(data.length)
				rows = () => null
			}

			return (
				<WrapperComponent class={`${prefixCls}-tbody`}>
					{/* measure body column width width additional hidden col */}
					{rows}
				</WrapperComponent>
			)
		}
	}
})
