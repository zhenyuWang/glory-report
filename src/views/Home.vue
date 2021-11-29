<template>
  <div class="home t_center">
    Home
    <el-input v-model="input" placeholder="Please input" />
    <el-button type="primary">Primary</el-button>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
export default defineComponent({
  name: "HomePage",
  setup() {
    const input = ref("");
    return { input };
  },
});
</script>
