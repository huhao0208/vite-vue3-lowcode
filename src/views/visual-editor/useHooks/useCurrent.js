
import {getAttrsConfig} from "@/views/visual-editor/components/Packages/index.js";
export default function useCurrent() {
    const pStore = useCustomPage();

    const currentUid = computed(() => {
            return pStore.currentUid;
        }
    );

    const setCurrentUid = (uid) => {
        pStore.setCurrent(uid)
    }

    const currentDetail = computed(() => {
        return pStore.currentDetail;
    })

    const attrsConfig = ref(null)

    // 监听currentDetail的uid变化获取对应组件配置
    // watch(currentDetail, () => {
    //     getAttrsConfig(currentDetail.value?.componentName,currentDetail.value?.type).then((res) => {
    //         attrsConfig.value = res
    //     })
    // })


    return {
        currentUid,
        setCurrentUid,
        currentDetail,
        attrsConfig
    }

}
