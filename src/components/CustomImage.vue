<script setup lang="ts">
import { ref } from 'vue';
import { 
    ElImage,
    ElDialog,
    ElButton,
    ElMessage,
    ElMessageBox,
    ElIcon
} from 'element-plus';
import {
    StarFilled,
    Star,
    CircleCheck,
    CircleCheckFilled
} from '@element-plus/icons-vue'
import { useOutputStore } from '@/stores/outputs';
import { useUIStore } from '@/stores/ui';
import { useIntersectionObserver, onLongPress } from '@vueuse/core';
import { useGeneratorStore } from '@/stores/generator';

const props = defineProps<{
    id: number;
    image: string;
    prompt: string;
    sampler_name: "k_lms" | "k_heun" | "k_euler" | "k_euler_a" | "k_dpm_2" | "k_dpm_2_a" | "DDIM" | "PLMS";
    seed: string;
    steps: number;
    cfg_scale: number;
    height: number;
    width: number;
    modelName: string;
    starred: boolean;
}>();

const store = useOutputStore();
const genStore = useGeneratorStore();
const uiStore = useUIStore();
const confirmDelete = () => {
    ElMessageBox.confirm(
        'This action will permanently delete this image. Continue?',
        'Warning',
        {
            confirmButtonText: 'OK',
            cancelButtonText: 'Cancel',
            type: 'warning',
        }
    )
        .then(() => {
            store.deleteOutput(props.id);
            ElMessage({
                type: 'success',
                message: 'Deleted Image',
            })
        })
}

function downloadWebp(base64Data: string, fileName: string) {
    const linkSource = `${base64Data}`;
    const downloadLink = document.createElement("a");
    downloadLink.href = linkSource;
    downloadLink.download = fileName.substring(0, 255) + ".webp"; // Only get first 255 characters so we don't break the max file name limit
    downloadLink.click();
}

const centerDialogVisible = ref(false);
const imageRef = ref<HTMLElement | null>(null)

// Add way to reset
onLongPress(
    imageRef,
    uiStore.toggleMultiSelect,
    { modifiers: { prevent: true } }
)
const shouldRender = ref(false);
useIntersectionObserver(
    imageRef,
    ([{ isIntersecting }]) => {
        shouldRender.value = isIntersecting;
    }, {
        rootMargin: '1000px'
    }
);
</script>

<template>
    <div id="content" ref="imageRef">
        <div v-if="shouldRender">
            <el-image class="thumbnail" :src="image" @click="centerDialogVisible = true" fit="cover" loading="lazy" />
            <el-icon v-if="starred" :size="40" color="var(--el-color-warning)"><StarFilled /></el-icon>
            <el-icon v-if="uiStore.multiSelect" style="float:right" @click="uiStore.toggleSelection(id)" :size="40" :color="uiStore.selected.includes(id) ? 'rgba(255, 255, 255, 1)' : 'rgba(255, 255, 255, 0.5)'">
                <CircleCheck v-if="!uiStore.selected.includes(id)" />
                <CircleCheckFilled v-if="uiStore.selected.includes(id)" />
            </el-icon>
        </div>
    </div>
    <el-dialog
      v-model="centerDialogVisible"
      :title="prompt ? prompt : 'Unkown Creation'"
      :width="width"
      class="image-viewer"
      align-center
    >
      <div class="main-photo"><el-image :src="image" @click="centerDialogVisible = true" fit="fill" loading="lazy" /></div>
      <template #footer>
        <div class="modal-footer">
            <div class="text-left" style="grid-area: info; text-align: center;">
                <span>Model Name: {{modelName ? modelName : "Unknown"}} - </span>
                <span>Sampler: {{sampler_name ? sampler_name : "Unknown"}} - </span>
                <span>Seed: {{seed ? seed : "Unknown"}} - </span>
                <span>Steps: {{steps ? steps : "Unknown"}} - </span>
                <span>CFG Scale: {{cfg_scale ? cfg_scale : "Unknown"}} - </span>
                <span>Dimensions: {{width}}x{{height}}</span>
            </div>
            <div style="grid-area: main; width: 100%; text-align: center; margin-top: 10px">
                <el-button @click="confirmDelete" type="danger" plain>Delete</el-button>
                <el-button @click="downloadWebp(image, `${seed}-${prompt}`)" type="success" plain>Download</el-button>
                <el-button v-if="!starred" @click="store.toggleStarred(id)" type="warning" :icon="Star" plain />
                <el-button v-if="starred" @click="store.toggleStarred(id)" type="warning" :icon="StarFilled" plain />
                <el-button @click="genStore.generateImg2Img(image)" type="success" plain>Send to img2img</el-button>
                <el-button @click="genStore.generateInpainting(image)" type="success" plain>Send to inpainting</el-button>
            </div>
        </div>
      </template>
    </el-dialog>
</template>

<style>
    .thumbnail {
        position: absolute;
        display: inline-block;
        overflow: hidden;
        top: 0px;
        right: 0px;
        width: 200px;
        height: 200px;
    }

    #content {
        position: relative;
        width: 200px;
        height: 200px;
    }

    .main-photo {
        display:flex;
        justify-content:center;
        width: 100%;
        background-color: var(--el-fill-color-light);
    }

    .text-left {
        text-align: left;
    }

    .image-viewer {
        min-width: 50vw;
    }

    .image-viewer > .el-dialog__header {
        word-break: keep-all;
    }

    .image-viewer > .el-dialog__body {
        display:flex;
        justify-content:center;
        padding-bottom: 0
    }

    .modal-footer {
        display: grid;
        grid-template-areas:
            'info'
            'main';
    }

    @media only screen and (max-width: 768px) {
        #content, .thumbnail {
            width: 150px;
            height: 150px;
        }

        .image-viewer > .el-dialog__body {
            padding: 0
        }

        .main-photo {
            width: 80%
        }
    }
</style>