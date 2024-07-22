<script setup lang="ts">
import { computed } from "vue";
import { TodoStatus } from "../../../core";
import ToggleItem from "../../atoms/ToggleItem/index.vue";

type Props = {
  text: string;
  status: TodoStatus;
};
const props = defineProps<Props>();

const emits = defineEmits(["updateStatus", "remove"]);

const isChecked = computed(() => props.status === "Completed");

const onUpdateStatus = () => {
  emits("updateStatus");
};

const onRemoveClick = () => {
  emits("remove");
};
</script>
<template>
  <div
    :class="[
      $style.root,
      {
        [$style.crossed]: isChecked,
      },
    ]"
  >
    <ToggleItem
      :checked="isChecked"
      :class="$style.checkbox"
      @change="onUpdateStatus"
    />
    <span :class="$style.text">{{ props.text }}</span>
    <button :class="$style.remove" @click="onRemoveClick"></button>
  </div>
</template>
<style lang="postcss" module>
.root {
  display: flex;
  align-items: center;
  gap: 13px;
  position: relative;
  border-bottom: 1px solid #ededed;
  padding: 15px;

  &.crossed {
    text-decoration: line-through;
    color: #d9d9d9;
  }

  &:hover {
    .remove {
      display: block;
    }
  }
}

.checkbox {
  flex-shrink: 0;
}

.text {
  flex-grow: 0;
  word-break: break-all;
  line-height: 1.2;
  font-size: 24px;
  transition: color 0.2s;
}
.remove {
  display: none;
  position: absolute;
  top: 50%;
  right: 16px;
  outline: 0;
  border: 0;
  line-height: 1;
  font-size: 30px;
  background: 0;
  transform: translateY(-50%);
  cursor: pointer;

  &:after {
    content: "×";
    color: rgba(175, 47, 47, 0.35);
  }
}
</style>
