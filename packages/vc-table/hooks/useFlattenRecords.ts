import { GetRowKey, Key } from '../interface'

import { computed, Ref } from 'vue'

export default function useFlattenRecords<T = unknown>(
	dataRef: Ref<T[]>,
	childrenColumnNameRef?: Ref<string>,
	expandedKeysRef?: Ref<Set<Key>>,
	getRowKey?: Ref<GetRowKey<T>>
) {
	const arr = computed(() => {
		const data = dataRef.value
		return data.map((item) => {
			return {
				record: item,
				indent: 0
			}
		})
	})

	return arr
}
