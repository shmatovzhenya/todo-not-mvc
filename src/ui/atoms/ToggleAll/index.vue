<script setup lang="ts">
const model = defineModel({ type: Boolean, required: true });
</script>
<template>
  <label :class="$style.label">
    <input v-model="model" :class="$style.input" type="checkbox" />
  </label>
</template>
<style module lang="postcss">
.label {
  position: absolute;
  transform: rotate(90deg);
}
.label:before {
  content: "❯";
  font-size: 22px;
  color: #e6e6e6;
}
.input {
  position: absolute;
  opacity: 0;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  cursor: pointer;
}
</style>
