import type { Todo, Storage, TodoStatus, TodoId } from "../core";

class TodoStorage<TodoContent> implements Storage<TodoContent> {
  private _loadAllFromStorage(): Todo<TodoContent>[] {
    const todos: Todo<TodoContent>[] =
      (JSON.parse(
        localStorage.getItem("todos") || "[]",
      ) as Todo<TodoContent>[]) || [];

    return todos;
  }

  async add(content: Todo<TodoContent>) {
    const todos = this._loadAllFromStorage();
    todos.push(content);
    localStorage.setItem("todos", JSON.stringify(todos));
  }

  async get(status?: TodoStatus): Promise<Todo<TodoContent>[]> {
    const todos = this._loadAllFromStorage();

    if (!status) {
      return todos;
    }

    return todos.filter((todo) => todo.status === status);
  }

  async update(
    id: TodoId,
    { status, content }: { status?: TodoStatus; content?: TodoContent },
  ) {
    const todos = this._loadAllFromStorage().map((todo) => {
      if (todo.id === id) {
        return {
          id: todo.id,
          status: status ? status : todo.status,
          content: content ? content : todo.content,
        };
      }

      return todo;
    });

    localStorage.setItem("todos", JSON.stringify(todos));
  }

  async remove(id: TodoId | TodoId[]) {
    const todos = this._loadAllFromStorage().filter((todo) => {
      if (Array.isArray(id)) {
        return !id.includes(todo.id);
      }

      return todo.id !== id;
    });

    localStorage.setItem("todos", JSON.stringify(todos));
  }

  async updateStatusToAll(nextStatus: TodoStatus) {
    const todos = this._loadAllFromStorage().map((todo) => {
      return { ...todo, status: nextStatus };
    });

    localStorage.setItem("todos", JSON.stringify(todos));
  }
}

export { TodoStorage };
