import {
	CSSProperties,
	DefineComponent,
	FunctionalComponent,
	Ref,
	HTMLAttributes
} from 'vue'

export type Key = number | string

export type DefaultRecordType = Record<string, any>

export type DataIndex = string | number | readonly (string | number)[]

export type FixedType = 'left' | 'right' | boolean

export type AlignType = 'left' | 'center' | 'right'

export type TableLayout = 'auto' | 'fixed'

export type CellEllipsisType = { showTitle?: boolean } | boolean

export type RowClassName<RecordType> = (
	record: RecordType,
	index: number,
	indent: number
) => string

export interface CellType<RecordType = DefaultRecordType> {
	key?: Key
	class?: string
	style?: CSSProperties
	column?: ColumnsType<RecordType>[number]
	colSpan?: number
	rowSpan?: number
	hasSubColumns?: boolean
	colStart?: number
	colEnd?: number
}
export interface RenderedCell<RecordType> {
	props?: CellType<RecordType>
	children?: any
}

export interface ColumnSharedType<RecordType> {
	title?: any
	key?: Key
	class?: string
	className?: string
	fixed?: FixedType
	customHeaderCell?: GetComponentProps<ColumnsType<RecordType>[number]>
	align?: AlignType
	ellipsis?: CellEllipsisType

	/**
	 * @private Internal Usage
	 */
	__originColumn__?: any
}

export interface ColumnGroupType<RecordType>
	extends ColumnSharedType<RecordType> {
	children: ColumnsType<RecordType>
}

export interface ColumnType<RecordType> extends ColumnSharedType<RecordType> {
	colSpan?: number
	dataIndex?: DataIndex
	rowSpan?: number
	customRender?: (opt: {
		value: any
		text: any
		record: RecordType
		index: number
		column: ColumnType<RecordType>
	}) => any | RenderedCell<RecordType>
	width?: number | string
	minWidth?: number
	maxWidth?: number
}

export type ColumnsType<RecordType = unknown> = readonly (
	| ColumnGroupType<RecordType>
	| ColumnType<RecordType>
)[]

export type GetRowKey<RecordType> = (record: RecordType, index?: number) => Key

// custom
export type GetComponentProps<DataType> = (
	data: DataType,
	index?: number
) => Omit<HTMLAttributes, 'style'> & { style: CSSProperties }

// Render
export type PanelRender<RecordType> = (data: readonly RecordType[]) => any

/// Events

export type TriggerEventHandler<RecordType> = (
	record: RecordType,
	event: MouseEvent
) => void

type Component<P> = DefineComponent<P> | FunctionalComponent<P> | string
export type CustomizeComponent = Component<any>
export type CustomizeScrollBody<RecordType> = (
	data: readonly RecordType[],
	info: {
		scrollbarSize: number
		ref: Ref<{ scrollLeft: number }>
		onScroll: (info: {
			currentTarget?: HTMLElement
			scrollLeft?: number
		}) => void
	}
) => any
export interface TableComponents<RecordType> {
	table?: CustomizeComponent
	header?: {
		wrapper?: CustomizeComponent
		row?: CustomizeComponent
		cell?: CustomizeComponent
	}
	body?:
		| CustomizeScrollBody<RecordType>
		| {
				wrapper?: CustomizeComponent
				row?: CustomizeComponent
				cell?: CustomizeComponent
		  }
}

export type GetComponent = (
	path: readonly string[],
	defaultComponent?: CustomizeComponent
) => CustomizeComponent

// Fix Columns
export interface StickyOffsets {
	left: readonly number[]
	right: readonly number[]
	isSticky?: boolean
}
