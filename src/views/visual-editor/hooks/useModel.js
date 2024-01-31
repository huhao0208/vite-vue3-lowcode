import { computed, defineEmits } from 'vue'
export  default function (getter,emitter){
    const state = ref(getter())

    watch(getter, (val) => {
        if (val!==state.value){
            state.value = val
        }
    })


    return {
        get value(){
            return state.value
        },
        set value(value){
            state.value = value
            emitter(value)
        },
    }
}
