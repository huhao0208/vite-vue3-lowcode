import {ElMessage, ElRadio, ElRadioGroup} from 'element-plus';
import {useQRCode} from '@vueuse/integrations/useQRCode'
import router from '@/router'
import {
    DocumentCopy,
    Cellphone,
    RefreshLeft,
    RefreshRight,
    Position,
    Delete,
    ChatLineSquare,
    Download,
    Upload,
} from '@element-plus/icons-vue';
import useModal from '@/hooks/useModal.jsx';
import 'element-plus/es/components/message/style/css';
import {useUndoRedoStore} from "store/useUndoRedoStore.js";
import {saveThemeEditorPreviewContent} from "api";

const standaloneBaseUrl = import.meta.env.VITE_CLIENT_STANDALONE


// 生成预览链接
const createPreviewLink = (isPreview) => {
    return new Promise(async (resolve, reject) => {
        const {
            query: {
                id
            }, params: {
                url
            }, path
        } = router.currentRoute.value

        let urlLink = `${standaloneBaseUrl}custom/${url}`
        const pStore = useCustomPage()
        if (isPreview) {
         try {
             await pStore.savePreview()
             urlLink+=`?id=${pStore.uid}&isPreview=1&t=${+new Date()}`
         }catch (e) {
             ElMessage({
                 type: 'warning',
                  message: '保存预览数据失败，请稍后再试！'
             })
         }
        }

        resolve(urlLink)
    })
};

const createPreviewModel = async(isPreview) => {
    const link = await createPreviewLink(isPreview)
    const qrcode = useQRCode(link, {
        size: 220,
    });
    useModal({
        title: '',
        props: {
            width: 400,
            height: 700
        },
        footer: null,
        content: () => (
            <div style={
                {

                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                }
            }>
                <h3 style={{marginTop: '-10px'}}>{isPreview?'编辑预览':'预览(发布状态)'}</h3>
                <a href={link} target={"_blank"} style={{
                    width: '100%',
                    whiteSpace: 'nowrap',
                    textAlign: 'center',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    padding: '10px 0',
                }}>
                    {link}
                </a>
                <img width={280} height={280} src={qrcode.value}/>
                {/*<div>*/}
                {/*    xxx分后过期*/}
                {/*</div>*/}

            </div>
        ),
    })
    ;
}


export const useTools = () => {

    const cStore = useCustomPage()
    const undoRedoStore = useUndoRedoStore()
    const tools = ref([

        {
            title: '撤销',
            icon: RefreshLeft,
            disabled: !undoRedoStore.canUndo,
            onClick: () => {
                const {list = [], pageConfig = {}} = undoRedoStore.undo()
                undoRedoStore.updateIsRecord(false)
                cStore.updateList(list)
                cStore.updatePageConfig(pageConfig)
                // nextTick(() => {
                //     undoRedoStore.updateIsRecord(true)
                // })
            },
        },
        {
            title: '重做',
            icon: RefreshRight,
            disabled: !undoRedoStore.canRedo,
            onClick: () => {
                const {list = [], pageConfig = {}} = undoRedoStore.redo()
                undoRedoStore.updateIsRecord(false)
                cStore.updateList(list)
                cStore.updatePageConfig(pageConfig)
                // nextTick(() => {
                //     undoRedoStore.updateIsRecord(true)
                // })
            },
        },
        {
            title: '清空页面',
            icon: Delete,
            onClick: () => {
                cStore.updateList([])
                cStore.updatePageConfig({})
            },
        },
        {
            title: '编辑预览',
            icon: Cellphone,
            onClick: async () => {
                await createPreviewModel(true)
            },
        },
        {
            title: '预览',
            icon: Position,
            onClick: async () => {
                await createPreviewModel(false)
            },
        },

    ])
    // 监听 store 的 canUndo 和 canRedo 变化
    const subscription = watch(
        () => [undoRedoStore.canUndo, undoRedoStore.canRedo],
        ([newCanUndo, newCanRedo]) => {
            tools.value.forEach((tool) => {
                if (tool.title === '撤销') {
                    tool.disabled = !newCanUndo;
                }
                if (tool.title === '重做') {
                    tool.disabled = !newCanRedo;
                }
            });
        },
        {deep: false}
    );

    // 在组件卸载时记得取消订阅
    onUnmounted(() => {
        subscription();
    });
    return tools;
};
