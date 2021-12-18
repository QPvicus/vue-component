import { defineComponent, ref, computed, reactive, toRefs } from 'vue'
import classNames from '../_util/classNames'
import { reactivePick } from '../_util/reactivePick'
import Body from './Body'
import ColGroup from './ColGroup'
import { useProvideBody } from './context/BodyContext'
import { useProvideTable } from './context/TableContext'
import Footer from './Footer'
import Header from './Header/Header'
import useColumns from './hooks/useColumns'
import {
	ColumnsType,
	ColumnType,
	CustomizeComponent,
	DefaultRecordType,
	GetComponentProps,
	GetRowKey,
	PanelRender,
	RowClassName,
	TableComponents,
	TableLayout
} from './interface'
import Panel from './Panel'
import { getDataAndAriaProps } from './utils/legacyUtil'
import { getPathValue, mergeObject, validateValue } from './utils/valueUtil'

const EMPTY_DATA = []
// columns data-source
export interface TableProps<RecordType = DefaultRecordType> {
	prefixCls?: string
	data?: RecordType[]
	columns?: ColumnsType<RecordType>
	rowKey?: string | GetRowKey<RecordType>
	tableLayout?: TableLayout
	//Fixed Columns
	scroll?: { x?: number | true | string; y?: number | string }

	rowClassName?: string | RowClassName<RecordType>
	// Additional Part
	title?: PanelRender<RecordType>
	footer?: PanelRender<RecordType>

	// customize
	id?: string
	showHeader?: boolean
	components?: TableComponents<RecordType>
	customRow?: GetComponentProps<RecordType>
	customHeaderRow?: GetComponentProps<readonly ColumnType<RecordType>[]>
	indentSize?: number

	direction?: 'ltr' | 'rtl'
}

export default defineComponent<TableProps<DefaultRecordType>>({
	name: 'Table',
	inheritAttrs: false,
	props: [
		'prefixCls',
		'data',
		'columns',
		'rowKey',
		'title',
		'footer',
		'scroll',
		'rowClassName',
		'indentSize',
		'id',
		'showHeader',
		'components',
		'customRow',
		'customHeaderRow',
		'tableLayout'
	] as any,
	slots: ['title', 'footer', 'emptyText', 'summary'],
	setup(props, { attrs, slots, emit }) {
		const mergedData = computed(() => props.data || EMPTY_DATA)
		const hasData = computed(() => !!props.data.length)
		const mergedComponents = computed(() =>
			mergeObject<TableComponents<any>>(props.components, {})
		)
		const getComponent = (path, defaultComponent?: CustomizeComponent) =>
			getPathValue<CustomizeComponent, TableComponents<any>>(
				mergedComponents.value,
				path
			) || defaultComponent

		const getRowKey = computed(() => {
			const rowKey = props.rowKey

			if (typeof rowKey === 'function') {
				return rowKey
			}
			return (record) => {
				const key = record && record[rowKey]
				return key
			}
		})

		const componentWidth = ref(0)
		const [columns, flattenColumns] = useColumns({
			...toRefs(props),
			getRowKey
		})
		const horizonScroll = computed(
			() => props.scroll && validateValue(props.scroll.x)
		)

		const columnContext = computed(() => ({
			columns: columns.value,
			flattenColumns: flattenColumns.value
		}))
		// ==================== Scroll =================
		const fullTableRef = ref<HTMLDivElement>()
		const scrollBodyRef = ref<HTMLDivElement>()

		// Convert map to number width
		const fixedHeader = computed(
			() => props.scroll && validateValue(props.scroll.y)
		)
		// Sticky

		const summaryFixedInfos = reactive<Record<string, boolean | string>>({})

		const summaryCollect = (uniKey: string, fixed: boolean | string) => {
			if (fixed) {
				summaryFixedInfos[uniKey] = fixed
			} else {
				delete summaryFixedInfos[uniKey]
			}
		}

		// TableLayout
		const mergedTableLayout = computed(() => {
			if (props.tableLayout) {
				return props.tableLayout
			}
			return 'auto'
		})

		const emptyNode = () => {
			return hasData.value ? null : slots.emptyText?.() || 'NO DATA'
		}

		useProvideTable(
			reactive({
				...toRefs(reactivePick(props, 'prefixCls')),
				getComponent,
				summaryCollect
			})
		)

		useProvideBody(
			reactive({
				...toRefs(reactivePick(props, 'rowClassName', 'indentSize')),
				columns,
				tableLayout: mergedTableLayout,
				componentWidth,
				flattenColumns,
				horizonScroll
			})
		)

		// Body
		const bodyTable = () => (
			<Body
				data={mergedData.value}
				getRowKey={getRowKey.value}
				v-slots={{ emptyNode }}
			></Body>
		)

		const bodyColGroup = () => (
			<ColGroup
				colWidths={flattenColumns.value.map(({ width }) => width)}
				columns={flattenColumns.value}
			/>
		)

		return () => {
			const {
				prefixCls,
				title = slots.title,
				footer = slots.footer,
				showHeader,
				customHeaderRow
			} = props
			const ariaProps = getDataAndAriaProps(attrs)
			const TableComponent = getComponent(['table'], 'table')
			const summaryNode = slots.summary?.({ pageData: mergedData.value })
			let groupTableNode = () => null

			// header props
			const headerProps = {
				customHeaderRow
			}

			// fixedHeader isSticky
			if (fixedHeader.value) {
				return <h1>Fixed Header</h1>
			} else {
				// Unique Table
				groupTableNode = () => (
					<div class={classNames(`${prefixCls}-content`)} ref={scrollBodyRef}>
						<TableComponent>
							{/* body group */}
							{bodyColGroup()}
							{showHeader !== false && (
								<Header {...headerProps} {...columnContext.value}></Header>
							)}
							{bodyTable()}
							{/* body Table */}
							{summaryNode && (
								<Footer flattenColumns={flattenColumns.value}>
									{summaryNode}
								</Footer>
							)}
						</TableComponent>
					</div>
				)
			}

			const fullTable = () => (
				<div
					{...ariaProps}
					class={classNames(prefixCls, {
						[attrs.class as string]: attrs.class
					})}
					style={attrs.style}
					ref={fullTableRef}
				>
					{title && (
						<Panel class={`${prefixCls}-title`}>
							{title(mergedData.value)}
						</Panel>
					)}
					<div class={`${prefixCls}-container`}>{groupTableNode()}</div>
					{footer && (
						<Panel class={`${prefixCls}-footer`}>
							{footer(mergedData.value)}
						</Panel>
					)}
				</div>
			)
			return fullTable()
		}
	}
})
