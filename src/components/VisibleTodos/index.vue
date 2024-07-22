<script setup lang="ts">
import { make } from "ts-brand";
import { computed } from "vue";
import { useTodoList } from "../../presenters/useTodoList";
import type { Todo, TodoStatus, TodoId } from "../../core";
import TodoItem from "../../ui/molecules/TodoItem/index.vue";
import TabPanel from "../../ui/atoms/TabPanel/index.vue";

const { list, actions, currentStatus, countNewItems } = useTodoList();

const buildTodoStatus = make<TodoStatus>();
const onUpdateStatus = async (todo: Todo<string>) => {
  await actions.updateStatus(
    todo.id,
    todo.status === "New"
      ? buildTodoStatus("Completed")
      : buildTodoStatus("New"),
  );
};

const tabStatuses = [
  {
    id: "All",
    label: "All",
  },
  {
    id: "New",
    label: "Active",
  },
  {
    id: "Completed",
    label: "Completed",
  },
];

const visibleStatus = computed(() => {
  if (!currentStatus.value) {
    return "All";
  }

  return currentStatus.value as string;
});

const onStatusTabChange = (nextVisibleStatus: TodoStatus | "All") => {
  if (nextVisibleStatus === "All") {
    actions.updateVisibleStatus(undefined);
  } else {
    actions.updateVisibleStatus(buildTodoStatus(nextVisibleStatus));
  }
};

const onRemove = async (id: TodoId) => {
  await actions.remove(id);
};

const onClearCompleted = async () => {
  await actions.clearCompleted();
};

const onUpdateText = async (id: TodoId, nextText: string) => {
  await actions.updateText(id, nextText);
};
</script>
<template>
  <div>
    <ul>
      <li v-for="item in list" :key="item.id">
        <TodoItem
          :text="item.content"
          :status="item.status"
          @update-status="onUpdateStatus(item)"
          @remove="onRemove(item.id)"
          @update-text="(text: string) => onUpdateText(item.id, text)"
        />
      </li>
    </ul>
    <footer :class="$style.footer">
      <span>{{ countNewItems }} items left</span>
      <TabPanel
        :list="tabStatuses"
        :selected="visibleStatus"
        name="statuses"
        @select="onStatusTabChange"
      />
      <button :class="$style.clear" @click="onClearCompleted">
        Clear completed
      </button>
    </footer>
  </div>
</template>
<style lang="postcss" module>
.footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 15px;
}
.clear {
  outline: 0;
  border: 0;
  background: 0;
  font-size: 14px;
  color: #777;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
}
</style>
