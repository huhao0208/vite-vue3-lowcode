
const modulesFiles = import.meta.glob('./**/*.vue');

// 将组件转换为对象形式，键为组件名（通常是路径去掉 .vue 后的名称），值为组件本身
const components = Object.entries(modulesFiles).reduce((componentsAccumulator, [path, component]) => {
    // 获取组件名称（通常基于文件路径） 从.vue往前取 如果是index 则再往前取
  const componentName = path.replace(/(\/index)?\.vue$/g,'').split('/').at(-1)

    // 注册到组件列表中
    componentsAccumulator[componentName] = markRaw(defineAsyncComponent(component));

    return componentsAccumulator;
}, {});
console.log(components,'components')
export default components;
const configFiles = import.meta.glob('./**/config.json');
console.log(configFiles,'configFiles')
// 根据名称获取对应的配置
export const getAttrsConfig =async (componentName,type) => {
   return new Promise((resolve,reject)=>{
     const config = configFiles[`./${type}/${componentName}/config.json`];
     config().then(res=>{
       if(res){
         resolve(res.default)
       }else{
         reject('配置文件不存在')
       }
     }).catch(reject)
   })
};

getAttrsConfig('Button','BasePackages').then(res=>{
  console.log(res,'xxxxxxxxxxxxxxxxxxxx')
})

