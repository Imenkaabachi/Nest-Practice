import { IsNotEmpty, IsString, IsUUID } from "class-validator";

export class AddSkillCvDto {
    @IsString({
    })
    @IsNotEmpty({
    })
    @IsUUID()
    skillId: string;
}