import Demo from 'vitepress-theme-demoblock/components/Demo.vue'
import DemoBlock from 'vitepress-theme-demoblock/components/DemoBlock.vue'

export function register(app) {
	app.component('Demo', Demo)
	app.component('DemoBlock', DemoBlock)
}
