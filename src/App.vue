<script setup lang="ts">
import { ref, onMounted } from 'vue';
import prototypefabric from './polygon';
import { Button } from 'ant-design-vue';

const canvasRef = ref(null);

const contentStyle = {
  textAlign: 'center',
  minHeight: '120px',
  lineHeight: '120px',
  height: "100vh",
  color: '#fff',
  backgroundColor: '#108ee9',
};

const siderStyle = {
  textAlign: 'center',
  lineHeight: '120px',
  color: '#fff',
  backgroundColor: '#3ba0e9',
};

onMounted(() => {
  prototypefabric.initCanvas(canvasRef.value);
  prototypefabric.polygon.drawPolygon();

  function resizeCanvas() {
    let w = document.querySelector('main').clientWidth
    let h = document.querySelector('main').clientHeight
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
        <a-layout-content :style="contentStyle"><canvas ref="canvasRef" style="border: 1px solid #ccc;"></canvas></a-layout-content>
        <a-layout-sider :style="siderStyle">Sider</a-layout-sider>
      </a-layout>
  </div>

</template>

<style scoped>
</style>
