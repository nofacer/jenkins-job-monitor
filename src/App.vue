<script setup lang="ts">
import {ref, onMounted} from 'vue'
import {exists, readTextFile, BaseDirectory} from '@tauri-apps/plugin-fs';
import {appConfigDir} from '@tauri-apps/api/path'
import Monitor from "./components/Monitor.vue";
import type { AppConfig } from './typing';

const configFile = "config.json"
const loading = ref(true)
const config = ref<AppConfig|null>(null)
const error = ref("")

async function loadConfig() {
    console.log(await appConfigDir())
    if (!await exists(configFile, {baseDir: BaseDirectory.AppConfig})) {
        error.value = `${await appConfigDir()}/${configFile} doesn't exist`
        return
    }
    const configStr = await readTextFile(configFile, {baseDir: BaseDirectory.AppConfig})
    return JSON.parse(configStr)
}

onMounted(async () => {
    loadConfig().then(value => config.value = value).catch(reason => error.value = reason)
    loading.value = false
})
</script>

<template>
    <div v-if="loading">loading config...</div>
    <div v-else>
        <div v-if="error">
            {{ error }}
        </div>
        <div v-else-if="config">
            <Monitor :config="config"></Monitor>
        </div>
    </div>
</template>

<style scoped>
</style>
