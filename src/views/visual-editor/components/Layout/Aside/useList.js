import packagesJson from "@/views/visual-editor/components/Packages/index.js";
export default function useList() {
    const packages = ref([])
    onMounted(()=>{
        packages.value = packagesJson.map(item=>{
            return {
                ...item,
                components: item.components?.map(child=>{
                    return {
                        ...child,
                       type:item.type
                    }
                })
            }
        })
    })
    return {
        packages
    }
}
