<script setup lang="ts">
import { ref } from 'vue'

defineProps<{ msg: string }>()

const count = ref(0)
</script>

<template>
  <h1>{{ msg }}</h1>

  
  <div class="test">
    123asd
  </div>
</template>

<style lang="scss" scoped>

.read-the-docs {
  color: #888;
}
.test{
  background-color: $primary-color;
}
</style>
