
const modules = import.meta.glob(`./**/*.{vue,jsx}`)
console.log(Object.keys(modules))
export function getComponent(parentPath, path) {
    const fullPath = `./${parentPath}/${path}`.replace('//','/')
    console.log(fullPath,'fullPath')
    let link = modules[`${fullPath}/index.vue`];
    if (!link) {
        link = modules[`${fullPath}.vue`];
    }
    console.log(link)
    return link ? markRaw(defineAsyncComponent(link)) : null
}

