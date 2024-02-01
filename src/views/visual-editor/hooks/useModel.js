import {computed} from 'vue'

export default function createComputed(getter, setter) {
    const result = computed({
        get() {
            return getter()
        },
        set(val) {
           nextTick(() => {
               setter(val)
           })
        }
    })

    return result
}
