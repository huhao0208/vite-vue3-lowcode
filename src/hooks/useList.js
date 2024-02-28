/**
 * @description 分页获取列表数据
 * @param listApi 请求接口
 * @param listKey 列表数据key 默认list
 * @param pagesKey 总页码key 默认pages
 * @param pageSizeKey  每页条数key
 * @param pageSize 默认每页条数10
 * @param totalKey 总条数key 默认total
 * @param pageNumKey 页码key 默认pageNum
 * @param immediate 是否立即请求
 * @param isTable 是否为表格获取数据 表格数据不需要叠加列表
 * @returns {{pages: Ref<UnwrapRef<number>>, reload: (function(): void), loadList: (function(): void), list: Ref<UnwrapRef<*[]>>, pageNum: Ref<UnwrapRef<number>>, status: Ref<UnwrapRef<string>>}}
 */
export default function useList({
                                    listApi,
                                    listKey = "list",
                                    pagesKey = "pages",
                                    pageSizeKey = "pageSize",
                                    pageSize:pageSize1 = 10,
                                    totalKey = "total",
                                    pageNumKey = "pageNum",
                                    immediate = false,
                                    isTable = false
                                }) {
    const list = ref([])
    const pageNum = ref(isTable ? 1 : 0)
    const pageSize = ref(pageSize1)
    const pages = ref(0)
    const status = ref('loading')
    const total = ref(0)
    const loadList = () => {
        // 列表加载 页码自动叠加
        !isTable && pageNum.value++
        if (pageNum.value !== 1&&status.value === 'noMore') {
            return
        }
        status.value = 'loading'
        listApi({
            [pageNumKey]: pageNum.value,
            [pageSizeKey]: pageSize.value
        }).then(res => {
            const listData = res[listKey] || [];
            if (pageNum.value === 1||isTable){
                list.value = listData
            }else{
                list.value?.push(...listData)
            }

            pages.value = res[pagesKey]
            status.value = pageNum.value >= pages.value ? 'noMore' : 'loadMore'
            total.value = res[totalKey]


        })
    }

    onMounted(() => {
        if (immediate) {
            loadList()
        }
    })
    /**
     * @description 重新加载数据
     */
    const reload = () => {
        // 如果是列表加载 则重置页码
        console.log('重新加载数据')
        if (!isTable) pageNum.value = 0
        loadList()
    }
    /**
     * @description 改变页码和每页条数 isTable专属方法
     * @param pageNum
     * @param pageSize
     */
    const loadTableList = ({pageNum,pageSize}) => {
        if (!isTable) return
        pageNum.value = pageNum
        pageSize.value = pageSize
        loadList()
    }


    return {
        status,
        pages,
        total,
        pageNum,
        pageSize,
        list,
        loadList,
        reload,
        loadTableList
    }
}
