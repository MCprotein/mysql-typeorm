import { validate } from 'class-validator';
import { getRepository } from 'typeorm';
import { Todo } from '../entity';

export interface TodoDbInfo {
  title: string;
  content: string;
}

export class TodoModel {
  async find(): Promise<Todo[]> {
    const todoRepository = getRepository(Todo);
    const todos = await todoRepository.find();
    return todos;
  }

  async findById(id: number): Promise<Todo | null> {
    const todo = await getRepository(Todo)
      .createQueryBuilder('todo')
      .innerJoinAndSelect('todo.user', 'user')
      .where('todo.id = :id', { id })
      .orderBy('todo.id', 'ASC')
      .getOne();
    return todo;
  }

  async create(todoInfo: TodoDbInfo): Promise<Todo> {
    const todoRepository = getRepository(Todo);
    const newtodo = todoRepository.create(todoInfo);
    const errors = await validate(newtodo);
    if (errors.length > 0) {
      throw new Error('모든 정보를 입력해 주세요.');
    } else {
      const createdtodo = await todoRepository.save(newtodo);
      return createdtodo;
    }
  }

  async update(
    id: number,
    updateInfo: Partial<TodoDbInfo>
  ): Promise<Todo | null> {
    const todoRepository = getRepository(Todo);
    await todoRepository.update({ id }, updateInfo);
    const updatedtodo = await todoRepository.findOneBy({ id });
    return updatedtodo;
  }

  async delete(id: number): Promise<void> {
    const todoRepository = getRepository(Todo);
    const result = await todoRepository.delete({ id });
    // delete return 값 -> DeleteResult {raw : [], affected : 1}
    // delete가 성공할 경우 affected의 값이 1로 온다.
    if (result.affected === 0) {
      throw new Error(`${id} 글이 존재하지 않습니다.`);
    }
  }
}

export const todoModel = new TodoModel();
