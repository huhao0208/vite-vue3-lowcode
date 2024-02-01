import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import {ElementPlusResolver} from 'unplugin-vue-components/resolvers'
import { VantResolver } from '@vant/auto-import-resolver';


export default defineConfig({

    base:'./',
    plugins: [
        vue(),
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
            resolvers: [ElementPlusResolver(),VantResolver()],
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
            'assets': path.resolve(__dirname, 'src/assets'),
            'views': path.resolve(__dirname, 'src/views'),
            've': path.resolve(__dirname, 'src/views/visual-editor'),
            'components': path.resolve(__dirname, 'src/components'),
            'utils': path.resolve(__dirname, 'src/utils'),
            'api': path.resolve(__dirname, 'src/api'),
            'store': path.resolve(__dirname, 'src/store'),
            'router': path.resolve(__dirname, 'src/router'),
        }
    }
})
