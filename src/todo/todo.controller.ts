import {
    Body,
    Controller,
    Delete,
    Get,
    NotFoundException,
    Param, Patch,
    Post,
    Put,
    Query,
    UseFilters, UseInterceptors,
    UsePipes, Version
} from '@nestjs/common';
import {TodoModel} from "./models/todo.model";
import {GetPaginatedTodoDto} from "./DTO/get-paginated-todo.dto";
import {AddTodoDto} from "./DTO/add-todo.dto";
import {UpdateTodoDto} from "./DTO/update-todo.dto";
import {TodoService} from "./todo.service";
import {TodoStatusValidationPipe} from "../pipes/todo-status-validation/todo-status-validation.pipe";
import {CustomExceptionFilter} from "../filters/custom-exception/custom-exception.filter";
import {DurationInterceptor} from "../interceptors/duration/duration.interceptor";
import {TodoEntity} from "./entities/todo.entity/todo.entity";
import {TodoStatusEnum} from "./models/TodoStatusEnum";
import {GetTodosDto} from "./DTO/get-todos-dto";

@UseInterceptors(DurationInterceptor)
@UseFilters(new CustomExceptionFilter())
@Controller('todo')
export class TodoController {

    constructor(
        private todoService: TodoService
    ) {
    }

    @Get()
    async findAll():Promise<TodoEntity[]>{
        return this.todoService.findAll();
    }

    @Post()
    async addTodos(
        @Body() todo: AddTodoDto
    ): Promise<TodoEntity> {
        return await this.todoService.addTodo(todo);

    }

    @Patch()
    async updateTodo2(
        @Body() updateObject,
    ) {
        const {updateCriteria, updateTodoDTO} = updateObject;
        return await this.todoService.updateTodo2(updateCriteria, updateTodoDTO);
    }

    @Get(':id')
    async getTodoById(
        @Param('id') id
    ): Promise<TodoEntity> {
        const todo= await this.todoService.getTodoById(id);
        if (!todo) {
            throw new NotFoundException(`Le todo d'id ${id} n'existe pas`);
        }
        return todo;
    }


    @Get('count')
    async getCountCompletedTodos() {
        return await this.todoService.countCompletedTodos();

    }

    @Get('stats')
    async statsTodoNumberByStatus(){
        return this.todoService.statTodoNumberByStatus();
    }


    @Get('recover/:id')
    async restoreTodo(
        @Param('id') id
    ) {
        return await this.todoService.restoreTodo(id);
    }

    @Patch(':id')
    async updateTodo(
        @Body() updateTodoDTO: UpdateTodoDto,
        @Param('id') id
    ): Promise<TodoEntity> {
        return this.todoService.updateTodo(id, updateTodoDTO);
    }

    @Delete(':id')
    async deleteTodos(
        @Param('id') id
    ) {
        return await this.todoService.softDeleteTodo(id);
    }



}
