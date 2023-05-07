import {TodoStatusEnum} from "./TodoStatusEnum";


export class TodoModel{
    id: string;
    name:string;
    description:string;
    createdAt:Date;
    status:TodoStatusEnum;
}