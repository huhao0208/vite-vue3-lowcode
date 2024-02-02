import {computed} from 'vue'

export default function createComputed(getter, setter) {
    return computed({
        get() {
            return getter()
        },
        set(val) {
            setter(val)
        }
    })
}
