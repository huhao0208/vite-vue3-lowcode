
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
import { useModal } from '@/hooks/useModal.jsx';
import 'element-plus/es/components/message/style/css';
export const useTools = () => {

    const state = reactive({
        coverRadio: 'current',
        importJsonValue: '',
    });
    const importJsonChange = (value) => {
        state.importJsonValue = value;
    };

    return [

        {
            title: '导出JSON',
            icon: Download,
            onClick: () => {
                const { copy } = useClipboard({ source: JSON.stringify(jsonData) });

                copy()
                    .then(() => ElMessage.success('复制成功'))
                    .catch((err) => ElMessage.error(`复制失败：${err}`));
            },
        },
        {
            title: '真机预览',
            icon: Cellphone,
            onClick: () => {
                const qrcode = useQRCode(`${location.origin}/preview`);
                useModal({
                    title: '预览二维码（暂不可用）',
                    props: {
                        width: 300,
                    },
                    footer: null,
                    content: () => (
                        <div class={'flex justify-center'}>
                            <img width={220} height={220} src={qrcode.value} />
                        </div>
                    ),
                });
            },
        },
        {
            title: '复制页面',
            icon: DocumentCopy,
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
                ElMessage({
                    showClose: true,
                    type: 'info',
                    duration: 2000,
                    message: '敬请期待！',
                });
            },
        },
        {
            title: '预览',
            icon: Position,
            onClick: () => {
                window.open(location.href.replace('/#/', '/preview/#/'));
            },
        },

    ];
};
