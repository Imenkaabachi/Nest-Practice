import {IsNotEmpty, IsString, MaxLength, MinLength} from "class-validator";

export class AddTodoDto{

    @IsNotEmpty({
        message:'this field is obligatory'
    })
    @IsString()
    @MinLength(3,{
        message: 'Min length is 3'
    })
    @MaxLength(10,{
        message: 'Max length is 10'
    })
    name:string;

    @IsNotEmpty({
        message:'this field is obligatory'
    })
    @IsString()
    @MinLength(10,{
        message: 'Min length is 10'
    })
    description:string;
}