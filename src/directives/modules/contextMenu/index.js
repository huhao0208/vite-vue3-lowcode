/**
 * @description:右键菜单
 * v-contextMenu={
 *     menuItems:[
 *          {label: '复制', disabled: false, type: 'copy'，onClick: () => {}},
 *          {label: '删除', disabled: false, type: 'delete'，onClick: () => {}},
 *     ]
 *  }
 * 接收参数：menuItems 菜单对象数组
 * 菜单对象属性：label disabled type onClick
 *
 */
import {h, nextTick, render} from "vue";
import ContextMenu from "./ContextMenu.vue";


const contextMenu = {
    mounted(el, binding, vnode) {
        // console.log(el, binding, vnode,'el, binding, vnode')
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
    },

    unmounted(el) {
        el.removeEventListener('contextmenu', el._showContextMenu);
        document.removeEventListener('click', el._hideContextMenu);
    }
};

export default contextMenu;
