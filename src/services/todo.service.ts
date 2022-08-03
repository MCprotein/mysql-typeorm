import { validate } from 'class-validator';
import { getRepository } from 'typeorm';
import { Todo } from '../entity';
import { TodoModel, todoModel, TodoDbInfo } from '../models';
import { todoValidation } from '../utils';
interface todoInfo extends TodoDbInfo {
  passwordConfirm: string;
}

class TodoService {
  todoModel: TodoModel;
  constructor(todoModel: TodoModel) {
    this.todoModel = todoModel;
  }

  async gettodos(): Promise<Todo[]> {
    return await this.todoModel.find();
  }

  async gettodoById(id: number): Promise<Todo> {
    const todo = await this.todoModel.findById(id);
    return await todoValidation.todoExist(todo);
  }

  async create(todoInfo: todoInfo): Promise<Todo> {
    return await this.todoModel.create(todoInfo);
  }

  async update(id: number, updateInfo: TodoDbInfo): Promise<Todo> {
    await this.todoModel.update(id, updateInfo);
    const updatedtodo = await this.todoModel.findById(id);
    return await todoValidation.todoExist(updatedtodo);
  }

  async delete(id: number): Promise<void> {
    const todo = await this.todoModel.findById(id);
    await todoValidation.todoExist(todo);
    await this.todoModel.delete(id);
  }
}

export const todoService = new TodoService(todoModel);
