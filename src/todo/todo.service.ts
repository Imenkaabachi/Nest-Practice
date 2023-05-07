import {Inject, Injectable, NotFoundException} from '@nestjs/common';
import {TodoModel} from "./models/todo.model";
import {TodoStatusEnum} from "./models/TodoStatusEnum";
import {AddTodoDto} from "./DTO/add-todo.dto";
import {UpdateTodoDto} from "./DTO/update-todo.dto";
import {IsNull, Not, Repository, SelectQueryBuilder} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";
import {TodoEntity} from "./entities/todo.entity/todo.entity";
import {GetPaginatedTodoDto} from "./DTO/get-paginated-todo.dto";
import {GetTodosDto} from "./DTO/get-todos-dto";

class APIfeatures {
    constructor(
        public query: SelectQueryBuilder<TodoEntity>,
        private queryString: GetPaginatedTodoDto,
    ) {}

    paginating() {
        const page = this.queryString.page || 1;
        const limit = this.queryString.limit || 9;
        const skip = (page - 1) * limit;
        this.query = this.query.offset(skip).limit(limit);
        return this;
    }
}
@Injectable()
export class TodoService {
    constructor(
        @Inject('UUID') private readonly uuid: () => string,

        @InjectRepository(TodoEntity)
        private todosRepository : Repository<TodoEntity>,
        ) {}
    todos: TodoModel[]=[];

    async getTodoById(id):Promise<TodoEntity>{
        return await this.todosRepository.findOne(id);
    }
    async addTodo(todo:AddTodoDto):Promise<TodoEntity>{
        return await this.todosRepository.save(todo);
    }

    async updateTodo(id:string,todo:UpdateTodoDto):Promise<TodoEntity>{
        const newTodo=await this.todosRepository.preload({
            id,
            ...todo
        });
        if (!newTodo)
            throw new NotFoundException('Todo with id ${id} is not found ');
        return await this.todosRepository.save(todo);
    }

    async updateTodo2(updateCriteria, todo:UpdateTodoDto){
        return this.todosRepository.update(updateCriteria,todo);
    }
    async deleteTodo(id){
        // const todoIndex = this.todos.findIndex((indexTodo) => indexTodo.id === id);
        // if (todoIndex >= 0)
        //     this.todos = this.todos.filter((indexTodo) => indexTodo.id !== id);
        // // this.todos.splice(todoIndex,1);
        // else
        //     throw new NotFoundException("Todo with ${id} is not found");
        // return 'todo with id ${} was deleted successfully'

        return await this.todosRepository.delete(id);
    }

    async softDeleteTodo(id){
        return await this.todosRepository.softDelete(id);
    }

    async restoreTodo(id){
        return await this.todosRepository.restore(id);
    }

    //stats using count
    async countCompletedTodos(): Promise<string> {
            const countActive = await this.todosRepository.count({ where: { status: TodoStatusEnum.active }});
            const countWaiting = await this.todosRepository.count({ where: { status: TodoStatusEnum.waiting } });
            const countDone = await this.todosRepository.count({ where: { status: TodoStatusEnum.done } });

            return "Number of active todos : "+countActive+"\n"
                +"Number of waiting todos : "+countWaiting+"\n"
                +"Number of done todos : "+countDone
        ;
    }

    //stats using querybuilder
    async statTodoNumberByStatus(){
        const qb = this.todosRepository.createQueryBuilder("todo");
        qb.select("todo.status, count(todo.id)")
            .groupBy("todo.status");
        console.log(qb.getSql());
        return await qb.getRawMany();

    }

    async getTodos({ data, status, page, limit }:GetTodosDto) {
        const qb = this.todosRepository.createQueryBuilder('todo');
        const pagination = { page, limit };
        if (data) {
            // look if data is found in name or description
            qb.where('todo.name LIKE :data', { data: `%${data}%` }).orWhere(
                'todo.description LIKE :data',
                { data: `%${data}%` },
            );
        }
        if (status) {
            qb.andWhere('todo.status = :status', { status });
        }
        const feature = new APIfeatures(qb, pagination).paginating();
        return await feature.query.getMany();
    }

    async findAll():Promise<TodoEntity[]> {
        return await this.todosRepository.find();
    }
}
