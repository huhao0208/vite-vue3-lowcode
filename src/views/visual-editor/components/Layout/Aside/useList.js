import packagesJson from "@/views/visual-editor/components/Packages/config.js";

export default function useList() {

    const packages = ref([])
    onMounted(()=>{
        packages.value = packagesJson?.map(item=>{
            return {
                ...item,
                components:item.components?.map(component=>{
                    return {
                        ...component,
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
