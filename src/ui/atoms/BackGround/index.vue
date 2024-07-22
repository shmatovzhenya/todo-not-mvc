<script setup lang="ts"></script>
<template>
  <div :class="$style.background">
    <h1 :class="$style.logo">todos</h1>
    <main :class="$style.main">
      <slot />
    </main>
    <footer :class="$style.footer">
      <p>Double-click to edit a todo</p>
    </footer>
  </div>
</template>
<style lang="postcss" module>
.background {
  width: 100%;
}
.logo {
  padding: 18px 0 12px;
  text-align: center;
  line-height: 1;
  font-size: 100px;
  font-weight: 100;
  color: rgba(175, 47, 47, 0.15);
}
.main {
  box-shadow:
    0 2px 4px 0 rgba(0, 0, 0, 0.2),
    0 25px 50px 0 rgba(0, 0, 0, 0.1);
  background: #fff;
}
.footer {
  margin-top: 65px;
  text-align: center;
  font-size: 10px;
  color: #bfbfbf;
}
</style>
