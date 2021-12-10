import { ref } from 'vue'
import type { Ref } from 'vue'

export default function useState<T>(defaultStateValue?: T | (() => T)) {
	const initValue: T =
		typeof defaultStateValue === 'function'
			? (defaultStateValue as any)()
			: defaultStateValue
	const innerValue = ref(initValue) as Ref<T>

	function triggerChange(newValue: T) {
		innerValue.value = newValue
	}
	return [innerValue, triggerChange] as const
}
