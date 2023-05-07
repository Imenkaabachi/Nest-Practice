import {TodoStatusEnum} from "../models/TodoStatusEnum";
import {GetPaginatedTodoDto} from "./get-paginated-todo.dto";
import {IsEnum, IsOptional, IsString, MaxLength} from "class-validator";

export class GetTodosDto extends GetPaginatedTodoDto{
    @IsOptional()
    @IsString({
    })
    @MaxLength(10, {
    })
    data: string;

    @IsOptional()
    @IsEnum(TodoStatusEnum)
    status?: TodoStatusEnum;
}