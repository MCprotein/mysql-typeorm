import { Todo } from '../../entity';
import { todoModel, TodoModel } from '../../models';
class TodoValidation {
  private todoModel: TodoModel;
  constructor(todoModel: TodoModel) {
    this.todoModel = todoModel;
  }
  async todoExist(todo: Todo | null): Promise<Todo> {
    if (!todo) {
      throw new Error('글이 존재하지 않습니다.');
    }
    return todo;
  }
}

export const todoValidation = new TodoValidation(todoModel);
