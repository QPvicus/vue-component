import { computed, ComputedRef, inject, InjectionKey, provide } from 'vue'

export type ContextSlots = {
	emptyText?: (...args: any[]) => any
	expandIcon?: (...args: any[]) => any
	title?: (...args: any[]) => any
	footer?: (...args: any[]) => any
	summary?: (...args: any[]) => any
	bodyCell?: (...args: any[]) => any
	headerCell?: (...args: any[]) => any
	customFilterIcon?: (...args: any[]) => any
	customFilterDropdown?: (...args: any[]) => any
	[key: string]: ((...args: any[]) => any) | undefined
}

type SlotsContextProps = ComputedRef<ContextSlots>

const SlotsContextKey: InjectionKey<SlotsContextProps> =
	Symbol('SlotsContextProps')

export const useProvideSlots = (props: SlotsContextProps) => {
	provide(SlotsContextKey, props)
}

export const useInjectSlots = () => {
	return inject(SlotsContextKey, computed(() => ({})) as SlotsContextProps)
}
