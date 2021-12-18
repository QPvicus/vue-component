import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import VueJSX from '@vitejs/plugin-vue-jsx'
import markdown from 'vite-plugin-md'
// https://vitejs.dev/config/
export default defineConfig({
	plugins: [vue(), VueJSX(), markdown()]
})
