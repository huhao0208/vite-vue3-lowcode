import {defineConfig,loadEnv} from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import {ElementPlusResolver} from 'unplugin-vue-components/resolvers'
import { VantResolver } from '@vant/auto-import-resolver';
import { resolve } from 'path'
import viteCompression from 'vite-plugin-compression'
import { VueHooksPlusResolver } from '@vue-hooks-plus/resolvers'
import vueJsx from "@vitejs/plugin-vue-jsx";


export default defineConfig(({ command, mode, isSsrBuild, isPreview }) =>{
    const ENV_CONFIG = loadEnv(mode, process.cwd());
    // console.log(ENV_CONFIG, '当前环境');
   return {
       base:'./',
       plugins: [
           vueJsx(),
           vue(),
           viteCompression({
               filter: /.(js|css|html|json|mjs|png|jpg|jpeg|svg)$/i  // 这些文件都要压缩
           }),
           AutoImport({
               include: [
                   /\.[tj]sx?$/,
                   /\.vue$/,
                   /\.vue\?vue/,
                   /\.md$/,
               ],
               imports: ['vue', 'vue-router', 'pinia', '@vueuse/core'],//自动引入
               //注意这个配置和src同级
               dts: './auto-imports.d.ts',
               resolvers: [ElementPlusResolver(),VantResolver(),VueHooksPlusResolver()],
               vueTemplate: true, //是否解析.vue文件
               dirs: [//配置本地目录自动引入
                   "./src/utils/**",
                   "./src/api/**",
                   "./src/store/**",
                   "./src/router/**",
               ],
           }),
           //组件按需自动引入
           Components({
               dirs: ['./src/components','./src/views/visual-editor/components'],//查找组件的相对路径
               extensions: ['vue'],//组件的扩展名
               deep: true,//搜索子目录
               // allowOverrides:true,//覆盖其他同名文件
               //默认存放位置
               dts: "src/components.d.ts",
               // collapseSamePrefixes:true,
               resolvers: [ElementPlusResolver(),VantResolver()], //组件解析器element
           }),
       ],
       resolve: {
           alias: {
               '@': path.resolve(__dirname, 'src'),
               '@/': path.resolve(__dirname, 'src'),
               "@pre": path.resolve(__dirname, 'preview'),
               'assets': path.resolve(__dirname, 'src/assets'),
               'views': path.resolve(__dirname, 'src/views'),
               've': path.resolve(__dirname, 'src/views/visual-editor'),
               'components': path.resolve(__dirname, 'src/components'),
               'utils': path.resolve(__dirname, 'src/utils'),
               'api': path.resolve(__dirname, 'src/api'),
               'store': path.resolve(__dirname, 'src/store'),
               'router': path.resolve(__dirname, 'src/router'),
           }
       },
       build: {
           outDir: 'lowcode',
           emptyOutDir: true, //清空输出目录
           minify: 'esbuild',

           reportCompressedSize:false,//启用/禁用 gzip 压缩大小报告
           //输出路径
           rollupOptions: {
               input: {
                   main: resolve(__dirname, 'index.html'),
                   preview: resolve(__dirname, 'preview/index.html'),
               },
               output: {
                   chunkFileNames: 'js/[name].[hash].js',
                   assetFileNames: 'assets/[name].[hash][extname]',
               },
           },
       },
       esbuild: {
           drop: ['console', 'debugger'],
       },
       server: {
           // host: '0.0.0.0',
           port: ENV_CONFIG.VITE_PORT,
           proxy: {
               [ENV_CONFIG.VITE_BASE_API]: {
                   target: ENV_CONFIG.VITE_PROXY,
                   changeOrigin: true,
                   secure: false,
                   rewrite: (path) => {
                       return path.replace(ENV_CONFIG.VITE_BASE_API, '')
                   },
                   headers: {
                       Origin: ENV_CONFIG.VITE_PROXY,
                       Referer: ENV_CONFIG.VITE_PROXY,
                   },
               },

           },

       }
   }
})
