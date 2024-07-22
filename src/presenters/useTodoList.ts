import { ref, computed, onMounted, watch } from "vue";
import type { Todo, TodoStatus, TodoId } from "../core";
import { TodoList } from "../core";
import { TodoStorage } from "../storage";

const todoStorage = new TodoStorage<string>();
const todoList = new TodoList<string>(todoStorage);
const isHydrated = ref(false);
const list = ref<Todo<string>[]>([]);
const status = ref<TodoStatus | undefined>(undefined);
const countNewItems = ref<number>(0);

todoList.hydrate().then(() => (isHydrated.value = true));

const useTodoList = () => {
  const updateUI = async () => {
    list.value = await todoList.getByStatus(status.value);
    countNewItems.value = todoList.countNewItems;
  };

  const actions = {
    async add(content: string) {
      await todoList.add(content);
      await updateUI();
    },
    async updateStatus(id: TodoId, status: TodoStatus) {
      await todoList.updateStatus(id, status);
      await updateUI();
    },
    async updateVisibleStatus(nextStatus?: TodoStatus) {
      status.value = nextStatus;
    },
    async remove(id: TodoId) {
      await todoList.remove(id);
      await updateUI();
    },
    async clearCompleted() {
      await todoList.clearCompleted();
      await updateUI();
    },
  };

  onMounted(async () => {
    await updateUI();
  });

  watch(isHydrated, async () => await updateUI());
  watch(status, async () => await updateUI());

  return {
    list: computed(() => list.value),
    countNewItems: computed(() => countNewItems.value),
    currentStatus: computed(() => status.value),
    actions,
  };
};

export { useTodoList };
