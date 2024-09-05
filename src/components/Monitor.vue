<script setup lang="ts">
import {AppConfig} from '../typing'
const props = defineProps<{ config: AppConfig }>();
</script>
<template>
<div>
{{props}}
</div>

</template>

<style scoped></style>
