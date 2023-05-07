import {IsNotEmpty, IsNumber, IsString} from "class-validator";

export class CreateCvDto {
    @IsString({
    })
    @IsNotEmpty({
    })
    name: string;

    @IsString({
    })
    @IsNotEmpty({
    })
    firstname: string;

    @IsNumber()
    @IsNotEmpty({
    })
    age: number;

    @IsString({
    })
    @IsNotEmpty({
    })
    cin: string;

    @IsString({
    })
    @IsNotEmpty({
    })
    job: string;

    @IsString({
    })
    @IsNotEmpty({
    })
    path: string;
}
