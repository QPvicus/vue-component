import { InjectionKey, provide, inject } from 'vue'
import { GetComponent } from '../interface'

export interface TableContextProps {
	prefixCls: string

	getComponent: GetComponent

	// scrollbarSize: number

	// direction: 'ltr' | 'rtl'

	// isSticky: boolean
}

export const TableContextKey: InjectionKey<TableContextProps> =
	Symbol('TableContextProps')

export const useProvideTable = (props: TableContextProps) => {
	provide(TableContextKey, props)
}

export const useInjectTable = () => {
	return inject(TableContextKey, {} as TableContextProps)
}
