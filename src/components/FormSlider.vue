<script setup lang="ts">
import {
    ElFormItem,
    ElSlider,
    ElInputNumber
} from 'element-plus';
import type { Arrayable } from 'element-plus/es/utils/typescript';
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core';
import InfoTooltip from './InfoTooltip.vue'

const breakpoints = useBreakpoints(breakpointsTailwind);

const hideSlider = breakpoints.smallerOrEqual('md');

const props = defineProps<{
    label: string;
    modelValue: number | undefined;
    prop: string;
    min?: number;
    max?: number;
    step?: number;
    info?: string;
    disabled?: boolean;
    change?: Function;
}>();

const emit = defineEmits(["update:modelValue"]);

// Input returns null when empty
function onChanged(value: Arrayable<number> | undefined) {
    if (value == undefined) value = props.min;
    emit("update:modelValue", value);
    if (props.change) props.change(value);
}
</script>

<template>
    <el-form-item :prop="prop">
        <template #label>
            <div>{{label}}</div>
            <div v-if="info" style="display: flex; align-items: center; height: 100%; margin-left: 5px">
                <info-tooltip :info="info" :size="15"/>
            </div>
        </template>
        <el-slider v-if="!hideSlider" :model-value="modelValue" show-input :min="min" :max="max" :step="step" @input="onChanged" :disabled="disabled" />
        <el-input-number v-if="hideSlider" :model-value="modelValue"       :min="min" :max="max" :step="step" @change="onChanged" :disabled="disabled" />
    </el-form-item>
</template>