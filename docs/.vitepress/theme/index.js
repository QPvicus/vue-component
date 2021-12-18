import 'vitepress-theme-demoblock/theme/styles/index.css'
import { register } from './register-components'
import './antd.css'
import DefaultTheme from 'vitepress/theme'
import AntdVue from '../../../packages'
export default {
	...DefaultTheme,
	enhanceApp({ app }) {
		app.use(AntdVue)
		register(app)
	}
}
