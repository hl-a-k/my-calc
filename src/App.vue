<script setup lang="ts">
import { ref, onMounted } from 'vue';
import prototypefabric from './polygon'

const canvasRef = ref(null);

onMounted(() => {
  prototypefabric.initCanvas(canvasRef.value);
  prototypefabric.polygon.drawPolygon();
});
</script>

<template>
  <div>
    <button v-on:click="prototypefabric.polygon.drawPolygon">draw</button>
    <canvas width="400" height="400" ref="canvasRef" style="border: 1px solid #ccc;"></canvas>
  </div>

</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
