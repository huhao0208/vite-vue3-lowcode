// main.js 或其他包含 Vue 应用实例初始化的地方

import ContextMenu from './ContextMenu.vue';
import {h, render, nextTick} from 'vue';


export default function install(app) {
    app.component('ContextMenu', ContextMenu);
    app.directive('contextmenu', {
        mounted(el, binding, vnode) {
             console.log(el, binding, vnode,'el, binding, vnode')
            let menuElement = document.querySelector('.body_context-menu')
            if (!menuElement) {
                menuElement = document.createElement('div');
                menuElement.className = 'body_context-menu';
                document.body.appendChild(menuElement);
            }

            const isMenuVisible = ref(false);
            const menuPosition = ref({x: 0, y: 0});

            const showContextMenu = (e) => {
                e.preventDefault();
                menuPosition.value = {x: e.clientX, y: e.clientY};
                isMenuVisible.value = true;
                renderContextMenu();
            };

            const hideContextMenu = (e) => {
                // 判断数遍否在菜单上 如果在菜单范围则不关闭
                if (e && e.target && menuElement.contains(e.target)) {
                    return;
                }
                isMenuVisible.value = false
                renderContextMenu()

            };

            const renderContextMenu = () => {

                if (!isMenuVisible.value) {
                    render(null, menuElement);
                    return;
                }
                // 创建子组件实例
                const contextMenuInstance = h(ContextMenu, {
                    key: Date.now(), // 使用时间戳确保每次渲染新的VNode（避免复用问题）
                    el: el,
                    visible: isMenuVisible.value,
                    position: menuPosition.value,
                    menuItems: binding.value?.menuItems,
                    onClose: hideContextMenu
                });
                // 渲染子组件到DOM中
                nextTick(() => {
                    render(contextMenuInstance, menuElement)
                });
            };

            el.addEventListener('contextmenu', showContextMenu);
            document.addEventListener('click', hideContextMenu);
            el._showContextMenu = showContextMenu
            el._hideContextMenu = hideContextMenu
            // onBeforeUnmount(() => {
            //     el.removeEventListener('contextmenu', showContextMenu);
            //     document.removeEventListener('click', hideContextMenu);
            // });
        },

        unmounted(el) {
                el.removeEventListener('contextmenu', el._showContextMenu);
                document.removeEventListener('click', el._hideContextMenu);
        }
    });


}
