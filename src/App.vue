<script setup lang="ts">
import BackGround from "./ui/atoms/BackGround/index.vue";
import CreateAndSelect from "./components/CreateAndSelect/index.vue";
import VisibleTodos from "./components/VisibleTodos/index.vue";
</script>

<template>
  <BackGround>
    <CreateAndSelect />
    <VisibleTodos />
  </BackGround>
</template>

<style module lang="postcss"></style>
