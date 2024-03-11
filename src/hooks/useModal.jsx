import {
    defineComponent,
    reactive,
    createApp,
    getCurrentInstance,
    isVNode,
} from 'vue';
import {ElButton, ElDialog} from 'element-plus';
import {isFunction} from "@/utils/is";


const Modal = defineComponent({
    props: {
        options: {
            type: Object,
            default: () => ({}),
        },
    },
    setup(props) {
        const instance = getCurrentInstance();

        const state = reactive({
            options: props.options,
            visible: true,
            data:{}
        });

        const methods = {
            service: (options) => {
                state.options = options;
                methods.show();
            },
            show: () => (state.visible = true),
            hide: () => (state.visible = false),
        };

        const handler = {
            onConfirm: async () => {
                await state.options.onConfirm?.(state.data);
                methods.hide();
            },
            onCancel: () => {
                state.options.onCancel?.(state.data);
                methods.hide();
            },
            onClosed: () => {
                state.options.onClosed?.();
                state.data = {}
            }
        };

        Object.assign(instance.proxy, methods);

        return () => (
            <ElDialog
                v-model={state.visible}
                title={state.options.title}
                center
                v-bind:destroyOnClose={true}
                onClosed={handler.onClosed}
                {...state.options.props}
                onClose={handler.onCancel}
            >
                {{
                    default:!state.options.content? null: () =>
                        isVNode(state.options.content) ? ( state.options.content) : isFunction(state.options.content) ? (
                            state.options.content(state.data)
                        ) : '提示内容',
                    footer: !state.options.footer ? null :  () =>  isVNode(state.options.footer)? state.options.footer:  isFunction(state.options.footer) ? state.options.footer(state.data) :
                        (
                            <div>
                                <ElButton {...{onClick: handler.onCancel}}>取消</ElButton>
                                <ElButton type={'primary'} {...({onClick: handler.onConfirm})}>
                                    确定
                                </ElButton>
                            </div>
                        ),
                }}

            </ElDialog>
        );
    },
});

const useModal = (() => {
    let instance
    return (options) => {
        if (instance) {
            instance.service(options);
            return instance;
        }
        const div = document.createElement('div');
        // 设置id
        div.id = 'modal';
        document.body.appendChild(div);
        const app = createApp(Modal, {options});
        instance = app.mount(div);
        return instance;
    };
})();
export default useModal
