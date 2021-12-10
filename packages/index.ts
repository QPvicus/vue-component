import type { App } from 'vue'
export const components = []
export const install = (app: App) => {
	Object.keys(components).forEach((key) => {
		const component = components[key]
		if (component) {
			app.use(component)
		}
	})
}
