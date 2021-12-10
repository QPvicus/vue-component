import { DataIndex } from '../interface'

function toArray<T>(arr: T | readonly T[]): T[] {
	if (arr === undefined || arr === null) return []
	return Array.isArray(arr) ? arr : [arr]
}

export function getPathValue<ValuePath, ObjectType extends object>(
	record: ObjectType,
	path: DataIndex
): ValuePath {
	if (!path && typeof path !== 'number') {
		return record as unknown as ValuePath
	}

	const pathList = toArray(path)
	let current: ValuePath | ObjectType = record
	for (let i = 0; i < pathList.length; i++) {
		if (!current) {
			return null
		}
		const prop = pathList[i]
		current = current[prop]
	}
	return current as ValuePath
}

export function mergeObject<T extends object>(...objects: Partial<T>[]): T {
	const merged: Partial<T> = {}
	function fillProps(obj: object, clone: object) {
		if (clone) {
			Object.keys(clone).forEach((key) => {
				const value = clone[key]
				if (value && typeof value === 'object') {
					obj[key] = obj[key] || {}
					fillProps(obj[key], value)
				} else {
					obj[key] = value
				}
			})
		}
	}
	objects.forEach((clone) => {
		fillProps(merged, clone)
	})
	return merged as T
}

export function validateValue<T>(value: T) {
	return value !== null && value !== undefined
}
