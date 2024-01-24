
const modulesFiles = import.meta.glob('./**/*.vue');

// 将组件转换为对象形式，键为组件名（通常是路径去掉 .vue 后的名称），值为组件本身
const components = Object.entries(modulesFiles).reduce((componentsAccumulator, [path, component]) => {
    // 获取组件名称（通常基于文件路径） 从.vue往前取 如果是index 则再往前取
  const componentName = path.replace(/(\/index)?\.vue$/g,'').split('/').at(-1)


    console.log(componentName,component,'ComponentComponent')
    // 注册到组件列表中
    componentsAccumulator[componentName] = markRaw(defineAsyncComponent(component));

    return componentsAccumulator;
}, {});
console.log(components,'components')
export default components;
