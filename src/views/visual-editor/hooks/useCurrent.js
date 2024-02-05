
export default function useCurrent() {
    const pStore = useCustomPage();

    const {currentUid,currentDetail} = toRefs(pStore)



    const setCurrentUid = (uid) => {
        pStore.setCurrent(uid)
    }

    const updateCurrentDetail = (detail) => {
        pStore.setCurrentDetail(detail)
    }


    return {
        currentUid,
        setCurrentUid,
        currentDetail,
        updateCurrentDetail

    }

}
