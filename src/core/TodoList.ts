import { Brand, make } from "ts-brand";

type TodoId = Brand<string, "todo-id">;
type TodoStatus = Brand<"New" | "Completed", "todo-status">;

const todoIdBuild = make<TodoId>();
const todoStatusBuild = make<TodoStatus>();

interface Todo<Content> {
  readonly id: TodoId;
  readonly content: Content;
  readonly status: TodoStatus;
}

interface Storage<TodoContent> {
  add(content: Todo<TodoContent>): Promise<void>;
  get(status?: TodoStatus): Promise<Todo<TodoContent>[]>;
  update(
    id: TodoId,
    options: {
      status?: TodoStatus;
      content?: TodoContent;
    },
  ): Promise<void>;
  remove(id: TodoId | TodoId[]): Promise<void>;
  updateStatusToAll(nextStatus: TodoStatus): Promise<void>;
}

class TodoList<Content> {
  private _lastId: TodoId = todoIdBuild("0");
  private _collection: Record<TodoId, Omit<Todo<Content>, "id">> = {};
  private _order: TodoId[] = [];

  constructor(private _storage: Storage<Content>) {}

  _add(content: Content, id: TodoId, status: TodoStatus): Todo<Content> {
    const todo: Todo<Content> = {
      id,
      content,
      status,
    };

    this._lastId = todo.id;
    this._collection[todo.id] = {
      content: todo.content,
      status: todo.status,
    };

    this._order.push(todo.id);

    return todo;
  }

  async add(content: Content) {
    const id = todoIdBuild((+this._lastId + 1).toString());
    const status = todoStatusBuild("New");
    const todo = this._add(content, id, status);

    await this._storage.add(todo);
  }

  async hydrate() {
    const todos = await this._storage.get();

    todos.forEach(({ content, id, status }) => this._add(content, id, status));
  }

  async getByStatus(status?: TodoStatus): Promise<Todo<Content>[]> {
    const todoList = this._order.map((id) => {
      return { id, ...this._collection[id] };
    });

    if (!status) {
      return todoList;
    }

    return todoList.filter((todo) => status === todo.status);
  }

  async updateContent(id: TodoId, nextContent?: Content) {
    if (!nextContent) {
      await this.remove(id);
      return;
    }

    this._collection[id] = {
      content: nextContent,
      status: this._collection[id].status,
    };

    await this._storage.update(id, { content: nextContent });
  }

  async updateStatus(id: TodoId, nextStatus: TodoStatus) {
    this._collection[id] = {
      content: this._collection[id].content,
      status: nextStatus,
    };

    await this._storage.update(id, { status: nextStatus });
  }

  async remove(id: TodoId) {
    delete this._collection[id];
    this._order = this._order.filter((todoId) => todoId !== id);
    await this._storage.remove(id);
  }

  async clearCompleted() {
    const ids = this._order.reduce((result: TodoId[], id) => {
      const todo = this._collection[id];

      if (todo.status === todoStatusBuild("Completed")) {
        result.push(id);
      }

      return result;
    }, []);

    this._order = this._order.filter((id) => !ids.includes(id));
    ids.forEach((id) => delete this._collection[id]);

    await this._storage.remove(ids);
  }

  async updateStatusAll() {
    const nextStatus = this._isAllTodoCompleted
      ? todoStatusBuild("New")
      : todoStatusBuild("Completed");

    this._collection = this._order.reduce(
      (result: Record<TodoId, Omit<Todo<Content>, "id">>, id) => {
        result[id] = {
          content: this._collection[id].content,
          status: nextStatus,
        };
        return result;
      },
      {},
    );

    this._storage.updateStatusToAll(nextStatus);
  }

  get countNewItems(): number {
    const result = Object.values(this._collection).reduce((result, todo) => {
      if (todo.status === "New") {
        return result + 1;
      }

      return result;
    }, 0);

    return result;
  }

  private get _isAllTodoCompleted(): boolean {
    return Object.values(this._collection).every(
      (todo) => todo.status === "Completed",
    );
  }
}

export { TodoList };

export type { Todo, Storage, TodoStatus, TodoId };
