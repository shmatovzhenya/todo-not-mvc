<script setup lang="ts">
import { ref, watch } from "vue";
import ToggleAll from "../../ui/atoms/ToggleAll/index.vue";
import { useTodoList } from "../../presenters/useTodoList";

const isChecked = ref<boolean>(false);
const newTodoValue = ref<string>("");
const { actions } = useTodoList();

const onSubmit = async () => {
  await actions.add(newTodoValue.value);
  newTodoValue.value = "";
};

watch(isChecked, async () => {
  await actions.toggleStatusAll();
});
</script>
<template>
  <header :class="$style.header">
    <form @submit.prevent="onSubmit">
      <ToggleAll v-model="isChecked" :class="$style.toggler" />
      <input
        v-model="newTodoValue"
        placeholder="What needs to be done?"
        :class="$style.input"
      />
    </form>
  </header>
</template>
<style lang="postcss" module>
.header {
  position: relative;
  box-shadow: inset 0 -2px 1px rgba(0, 0, 0, 0.03);
  padding: 16px 16px 16px 60px;
  background: rgba(0, 0, 0, 0.003);
}
.toggler {
  position: absolute;
  left: 25px;
  top: calc(50% - 10px);
}
.input {
  outline: 0;
  width: 100%;
  border: 0;
  line-height: 34px;
  font-size: 24px;
  font-weight: 300;
  background: rgba(0, 0, 0, 0.003);
  color: rgb(77, 77, 77);
}
.input::placeholder {
  font-weight: 100;
  font-style: italic;
  color: #bfbfbf;
}
.input:focus {
  outline: 0;
}
</style>
