export const INTERNAL_COL_DEFINE = 'RC_TABLE_INTERNAL_COL_DEFINE'

export function getDataAndAriaProps(props: object) {
	return Object.keys(props).reduce((memo, key) => {
		if (key.substr(0, 5) === 'data-' || key.substr(0, 5) === 'aria-') {
			memo[key] = props[key]
		}
		return memo
	}, {})
}
