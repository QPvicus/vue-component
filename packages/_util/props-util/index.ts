function isValidElement(element: any) {
	if (Array.isArray(element) && element.length === 1) {
		element = element[0]
	}
	return element && element.__v_isVNode && typeof element.type !== 'symbol'
}

export { isValidElement }
