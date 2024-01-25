<script setup>

import useCurrent from "@/views/visual-editor/useHooks/useCurrent.js";
import {getAttrsConfig} from "@/views/visual-editor/components/Packages/index.js";
const {currentDetail,attrsConfig} = useCurrent()
</script>

<template>
{{attrsConfig}}
 1111
  {{currentDetail}}
</template>

<style scoped lang="scss">

</style>
