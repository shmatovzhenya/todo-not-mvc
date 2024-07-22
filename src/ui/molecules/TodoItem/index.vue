<script setup lang="ts">
import { computed, ref } from "vue";
import { onClickOutside } from "@vueuse/core";
import { TodoStatus } from "../../../core";
import ToggleItem from "../../atoms/ToggleItem/index.vue";

type Props = {
  text: string;
  status: TodoStatus;
};
const props = defineProps<Props>();

const emits = defineEmits(["updateStatus", "remove", "updateText"]);

const isChecked = computed(() => props.status === "Completed");
const isEditing = ref(false);
const target = ref(null);

const onUpdateStatus = () => {
  emits("updateStatus");
};

const onRemoveClick = () => {
  emits("remove");
};

const tempText = ref<string>(props.text);
const onSetEdit = () => {
  isEditing.value = true;
};

onClickOutside(target, () => {
  isEditing.value = false;
});

const onUpdateText = () => {
  emits("updateText", tempText.value);
  isEditing.value = false;
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
    @dblclick="onSetEdit"
  >
    <form v-if="isEditing" @submit.prevent="onUpdateText">
      <input v-model="tempText" type="text" :class="$style.edit" ref="target" />
    </form>
    <ToggleItem
      :checked="isChecked"
      :class="$style.checkbox"
      @change="onUpdateStatus"
    />
    <span :class="$style.text">{{ props.text }}</span>
    <button
      v-if="!isEditing"
      :class="$style.remove"
      @click="onRemoveClick"
    ></button>
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
.edit {
  position: absolute;
  box-shadow: inset 0 -1px 5px 0 rgba(0, 0, 0, 0.2);
  left: 56px;
  top: 0;
  right: 0;
  height: calc(100% - 4px);
  border: 1px solid #999;
  font-size: 24px;
  color: #4d4d4d;
}
</style>
