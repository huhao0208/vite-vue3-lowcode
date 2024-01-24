import packagesJson from "@/views/visual-editor/components/Packages/config.js";

export default function useList() {

    const packages = ref([])
    onMounted(()=>{
        packages.value = packagesJson
    })
    return {
        packages
    }
}
