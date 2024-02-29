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

const cStore = useCustomPage()
const undoRedoStore = useUndoRedoStore()

// 生成预览链接
const createPreviewLink = () => {
    return new Promise(async (resolve, reject) => {
        const {
            query: {
                id
            }, params: {
                url
            }, path
        } = router.currentRoute.value

        locationg.href.replace(/#/)
        resolve( location.href + path)
    })
};


export const useTools = () => {


    return [

        {
            title: '真机预览',
            icon: Cellphone,
            onClick: async () => {
                console.log('真机预览')
                const link = await createPreviewLink()
                const qrcode = useQRCode(link, {
                    size: 220,
                });
                useModal({
                    title: '预览二维码',
                    props: {
                        width: 500,
                        height: 700
                    },
                    footer: null,
                    content: () => (
                        <div style={'display:flex;justify-content:center;align-items:center'}>
                            <span>{link}</span>
                            <img width={280} height={280} src={qrcode.value}/>

                        </div>
                    ),
                })
                ;
            },
        },
        {
            title: '撤销',
            icon: RefreshLeft,
            disabled: !undoRedoStore.canUndo,
            onClick: () => {
                // ElMessage({
                //     showClose: true,
                //     type: 'info',
                //     duration: 2000,
                //     message: '敬请期待！',
                // });
               const {list,pageConfig} =  undoRedoStore.undo()
                undoRedoStore.updateIsRecord(false)
                cStore.updateList(list)
                cStore.updatePageConfig(pageConfig)

                nextTick(() => {
                    undoRedoStore.updateIsRecord(true)
                })
            },
        },
        {
            title: '重做',
            icon: RefreshRight,
            disabled: !undoRedoStore.canRedo,
            onClick: () => {
                // ElMessage({
                //     showClose: true,
                //     type: 'info',
                //     duration: 2000,
                //     message: '敬请期待！',
                // });
                const {list,pageConfig} =  undoRedoStore.redo()
                undoRedoStore.updateIsRecord(false)
                cStore.updateList(list)
                cStore.updatePageConfig(pageConfig)
                nextTick(() => {
                    undoRedoStore.updateIsRecord(true)
                })
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
            title: '预览',
            icon: Position,
            onClick: () => {
                const data = {
                    pageConfig: cStore.pageConfig,
                    list: cStore.list,
                }
                sessionStorage.setItem('pageInfo', JSON.stringify(data))
                window.open(location.href.replace('/#/', '/preview/#/'));
            },
        },

    ];
};
