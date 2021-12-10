export const isArray = Array.isArray
export const isString = (val: unknown): val is String => typeof val === 'string'
export const isObject = (val: unknown): val is Object =>
	val != null && typeof val === 'object'
export const isSymbol = (val: unknown): val is Symbol => typeof val === 'symbol'
export const isFunction = (val: unknown): val is Function =>
	typeof val === 'function'
