import {TodoStatusEnum} from "../models/TodoStatusEnum";
import {IsIn, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength} from "class-validator";
import {TodoStatusValidationPipe} from "../../pipes/todo-status-validation/todo-status-validation.pipe";
import {UsePipes} from "@nestjs/common";

@UsePipes(TodoStatusValidationPipe)
export class UpdateTodoDto{
    @IsOptional()
    @IsString()
    @MinLength(3,{
        message: 'Min length is 3'
    })
    @MaxLength(10,{
        message: 'Max length is 10'
    })
    name:string;

    @IsOptional()
    @IsString()
    @MinLength(10,{
        message: 'Min length is 10'
    })
    description:string;


    @IsOptional()
    status:TodoStatusEnum;
}