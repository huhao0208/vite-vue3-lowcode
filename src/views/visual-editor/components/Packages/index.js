const modulesFiles = import.meta.glob('./**/*.vue', {eager: true});


const packageTypeObj = {
    'BasePackages': {
        label: '基础组件',
        order: 1
    },
    "ContainerPackages": {
        label: '容器组件',
        order: 2
    },
}

const componentsObj = {}
const settingComponentsObj = {}
const packageModulesObj = {}

// 将组件转换为对象形式，键为组件名（通常是路径去掉 .vue 后的名称），值为组件本身
Object.entries(modulesFiles).forEach(([path, component]) => {
    const componentTarget = component?.default || component;

    const [packageType, componentName = '', lastName = ''] = path.replace(/\.\/|\.vue$/g, '').split('/')
    if (lastName.toLowerCase() === 'setting') {
        const {label, name, order} = componentTarget;
        componentsObj[componentName] = {
            ...componentsObj[componentName],
            label, name, order
        }
        settingComponentsObj[componentName] = componentTarget
        const {components = {}} = packageModulesObj[packageType] || {}

        components[componentName] = {
            ...components[componentName],
            label,
            name,
            order,
            settingComponent: componentTarget
        }

        packageModulesObj[packageType] = {
            ...packageTypeObj[packageType],
            components

        }
    }

    if (lastName.toLowerCase() === 'index') {
        componentsObj[componentName] = {
            ...componentsObj[componentName],
            ...componentTarget
        }
        const {components = {}} = packageModulesObj[packageType] || {}
        components[componentName] = {
            ...components[componentName],
            component: componentTarget
        }
        packageModulesObj[packageType] = {
            ...packageTypeObj[packageType],
            components
        }
    }

});



export const components = componentsObj
export const packageModules = packageModulesObj
export const settingComponents = settingComponentsObj

export default {
    components: components,
    packageModules: packageModules,
    settingComponents: settingComponents
};


