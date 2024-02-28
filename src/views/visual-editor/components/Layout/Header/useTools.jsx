
import { ElMessage, ElRadio, ElRadioGroup } from 'element-plus';
import { useQRCode } from '@vueuse/integrations/useQRCode'
import { useClipboard } from '@vueuse/core';
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

const cStore = useCustomPage()
export const useTools = () => {


    return [

        {
            title: '真机预览',
            icon: Cellphone,
            onClick: () => {
                console.log('真机预览')
                const qrcode = useQRCode(`${location.origin}/preview`,{
                    size: 220,
                });
                useModal({
                    title: '预览二维码',
                    props: {
                        width: 300,
                    },
                    footer: null,
                    content: () => (
                        <div style={'display:flex;justify-content:center;align-items:center'}>

                            <img width={280} height={280} src={qrcode.value} />
                        </div>
                    ),
                });
            },
        },
        {
            title: '撤销',
            icon: RefreshLeft,
            onClick: () => {
                ElMessage({
                    showClose: true,
                    type: 'info',
                    duration: 2000,
                    message: '敬请期待！',
                });
            },
        },
        {
            title: '重做',
            icon: RefreshRight,
            onClick: () => {
                ElMessage({
                    showClose: true,
                    type: 'info',
                    duration: 2000,
                    message: '敬请期待！',
                });
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
                sessionStorage.setItem('pageInfo',JSON.stringify(data))
                window.open(location.href.replace('/#/', '/preview/#/'));
            },
        },

    ];
};
