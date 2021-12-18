import type { App } from 'vue'
import * as components from './components'
export const install = (app: App) => {
	Object.keys(components).forEach((key) => {
		const component = components[key]
		if (component) {
			app.use(component)
		}
	})
}

export default {
	install
}
