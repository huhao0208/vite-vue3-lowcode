export default [
    {
        label: '基础组件',
        type: 'BasePackages',
        components: [
            {
                label: '顶部导航',
                name: 'NavBar',
            },
            {
                label: '图片',
                name: 'Image',
            },
            {
                label: '按钮',
                name: 'Button',
            },
            {
                label: '通知栏',
                name: 'NoticeBar',
            },
            {
                label: '底部导航',
                name: 'TabBar',
            },
            {
                label: '文本',
                name: 'Text',
            },
            {
                label: '轮播',
                name: 'Swipe',
            }
        ]
    },
    {
        label: '容器组件',
        dir: 'ContainerPackages'
    },
    {
        dir: 'BusinessPackages',
        label: '业务组件'
    }
]
