
const modules = import.meta.glob(`../../Packages/**/*.{vue,jsx}`)
console.log(Object.keys(modules))
function usePackages(path) {
    const fullPath = `../../Packages/${path}`.replace('//','/')
    console.log(fullPath,'fullPath')
    let link = modules[`${fullPath}/index.vue`];
    if (!link) {
        link = modules[`${fullPath}.vue`];
    }

    return link ? markRaw(defineAsyncComponent(link)) : null

}
import packagesJson from '@/views/visual-editor/components/Packages/index.js'


export default function (){
    const packages = ref([])
    onMounted(() => {
        packages.value = packagesJson.map(tab=>{
            return {
                ...tab,
                children: tab?.children?.map(item=>{
                    return {
                        ...item,
                        component: usePackages(`${tab.id}/${item.id}`)
                    }
                })
            }
        })
    })
    return {
        packages
    }
}
