<script setup lang="ts">
import { ref, onMounted } from 'vue';
import prototypefabric from './polygon';

const canvasRef = ref(null);
const recWidth = ref<number>(20);
const recHeight = ref<number>(10);
const basePointType = ref<number>(0);

const contentStyle = {
  textAlign: 'center',
  minHeight: '120px',
  lineHeight: '120px',
  height: "100vh",
  color: '#fff',
  backgroundColor: '#efefef',
};

const siderStyle = {
  // lineHeight: '120px',
  color: '#fff',
  backgroundColor: '#ffffff',
  fontSize: '10px'
  
};

function reset() {
  recWidth.value = 20
  recHeight.value = 10
  basePointType.value = 0
}

onMounted(() => {
  prototypefabric.initCanvas(canvasRef.value);
  prototypefabric.polygon.drawPolygon();

  function resizeCanvas() {
    let w = document.querySelector('main')?.clientWidth
    let h = document.querySelector('main')?.clientHeight
    window._canvas.setWidth(w)
    window._canvas.setHeight(h)
    window._canvas.renderAll()
  }

  window.addEventListener('resize', resizeCanvas, false);
  resizeCanvas()
});
</script>

<template>
  <div>
    <a-layout>
      <a-layout-content :style="contentStyle"><canvas ref="canvasRef"
          style="border: 1px solid #ccc;"></canvas></a-layout-content>
      <a-layout-sider :style="siderStyle">
        <a-card title="屋顶" :bordered="false">

        </a-card>
        <a-card title="障碍物" :bordered="false">

        </a-card>
        <a-card title="组件设置" :bordered="false">
          <a-input-number v-model:value="recWidth" :min="1" :max="20">
            <template #prefix>宽度</template>
          </a-input-number>

          <a-input-number v-model:value="recHeight" :min="1" :max="20">
            <template #prefix>长度</template>
          </a-input-number>

        </a-card>
     

        <a-card title="基准点" :bordered="false">
          <a-button type="primary">寻找基准点</a-button>
          <a-radio-group v-model:value="basePointType">
            <a-radio :value="0">最优</a-radio>
            <a-radio :value="1">初始</a-radio>
          </a-radio-group>

        </a-card>
        <a-button type="primary">排布</a-button><a-button @click="reset">重置</a-button>
      </a-layout-sider>
    </a-layout>
  </div>

</template>

<style scoped></style>
