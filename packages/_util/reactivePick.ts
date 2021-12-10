import { reactive, toRef, UnwrapRef } from 'vue'

export function reactivePick<T extends object, K extends keyof T>(
	obj: T,
	...keys: K[]
): { [S in K]: UnwrapRef<T[S]> } {
	return reactive(
		Object.fromEntries(keys.map((k) => [k, toRef(obj, k)]))
	) as any
}
