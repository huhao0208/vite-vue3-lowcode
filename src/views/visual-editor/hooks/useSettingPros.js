
import useModel from './useModel.js'
import {defineProps,defineEmits } from 'vue'
export default function useSettingPros(){

    const props = ref(useAttrs());

    onUpdated(() => {
        props.value = useAttrs();
    })

    // const props = defineProps({
    //     attrs: {
    //         type: Object,
    //         default: () => ({}),
    //     },
    //     styles: {
    //         type: Object,
    //         default: () => ({}),
    //     },
    //     events: {
    //         type: Object,
    //         default: () => ({}),
    //     },
    // });


    console.log(props,'propspropsprops')

    const emit = defineEmits(['update:attrs', 'update:styles', 'update:events']);

    const computedAttrs = useModel(() => props.value.attrs, (val) => emit('update:attrs', val));
    const computedStyles = useModel(() => props.value.styles, (val) => emit('update:styles', val));
    const computedEvents = useModel(() => props.value.events, (val) => emit('update:events', val));

    return {
        props,
        emit,
        attrs: computedAttrs,
        styles: computedStyles,
        events: computedEvents,
    };
}




