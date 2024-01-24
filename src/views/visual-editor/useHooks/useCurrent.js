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

    return {
        currentUid,
        setCurrentUid,
        currentDetail
    }

}
