<script setup lang="ts">
const props = defineProps({
  checked: {
    type: Boolean,
    default: false,
  },
});

const emits = defineEmits(["change"]);

const onChange = () => {
  emits("change", !props.checked);
};
</script>
<template>
  <div
    :class="[
      $style.root,
      {
        [$style.selected]: props.checked,
      },
    ]"
  >
    <input
      type="checkbox"
      :checked="props.checked"
      :class="$style.input"
      @change="onChange"
    />
  </div>
</template>
<style lang="postcss" module>
.root {
  position: relative;
  width: 36px;
  height: 36px;
  background-image: url("data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%22-10%20-18%20100%20135%22%3E%3Ccircle%20cx%3D%2250%22%20cy%3D%2250%22%20r%3D%2250%22%20fill%3D%22none%22%20stroke%3D%22%23ededed%22%20stroke-width%3D%223%22/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-size: 45px 45px;
  background-position: -8px -5px;

  &.selected {
    background-image: url("data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%22-10%20-18%20100%20135%22%3E%3Ccircle%20cx%3D%2250%22%20cy%3D%2250%22%20r%3D%2250%22%20fill%3D%22none%22%20stroke%3D%22%23bddad5%22%20stroke-width%3D%223%22/%3E%3Cpath%20fill%3D%22%235dc2af%22%20d%3D%22M72%2025L42%2071%2027%2056l-4%204%2020%2020%2034-52z%22/%3E%3C/svg%3E");
  }
}
.input {
  position: absolute;
  z-index: 1;
  opacity: 0;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
}
</style>
