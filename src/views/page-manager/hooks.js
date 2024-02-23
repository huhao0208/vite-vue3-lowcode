import {listThemeEditorClass} from "api";

export const useList = function ({
                                     listApi,
                                     listKey = "list",
                                     pagesKey = "pages",
                                     pageSizeKey = "pageSize",
                                     pageSize = 10,
                                     pageNumKey = "pageNum"
                                 }) {
    const list = ref([])
    const pageNum = ref(0)
    const pages = ref(0)
    const status = ref('loading')

    const loadList = () => {
        if (pageNum.value === 0) {
            list.value = []
        } else {
            if (status.value === 'noMore') return
        }
        status.value = 'loading'
        listApi({
            [pageNumKey]: pageNum.value + 1,
            [pageSizeKey]: pageSize
        }).then(res => {
            const {pages: pages1} = res
            list.value.push(...(res[listKey] || []))
            pages.value = res[pagesKey]
            status.value = pageNum.value >= pages.value ? 'noMore' : 'loadMore'

        })
    }
    const reload = () => {
        pageNum.value = 0
        loadList()
    }
    return {
        status,
        pages,
        pageNum,
        list,
        loadList,
        reload
    }
}
