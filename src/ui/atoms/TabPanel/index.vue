<script setup lang="ts">
type Props = {
  name: string;
  list: { id: string; label: string }[];
  selected: string;
};

const props = defineProps<Props>();
const emits = defineEmits(["select"]);

const onInputChange = (id: string) => {
  emits("select", id);
};
</script>
<template>
  <ul :class="$style.list">
    <li
      v-for="item in props.list"
      :key="item.id"
      :class="[$style.item, { [$style.selected]: item.id === props.selected }]"
    >
      <label :class="$style.label">
        {{ item.label }}
        <input
          :class="$style.input"
          type="radio"
          :checked="item.id === props.selected"
          :name="props.name"
          :value="item.id"
          @change="onInputChange(item.id)"
        />
      </label>
    </li>
  </ul>
</template>
<style lang="postcss" module>
.list {
  display: inline-flex;
  gap: 6px;
}

.item {
  position: relative;
  border: 1px solid transparent;
  border-radius: 3px;
  padding: 3px 7px;
  font-size: 14px;
  color: #777;

  &:not(.selected) {
    .input {
      cursor: pointer;
    }
  }

  &.selected {
    border-color: rgba(175, 47, 47, 0.2);
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
}
</style>
