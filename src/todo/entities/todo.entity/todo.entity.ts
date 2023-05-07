import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import {TodoStatusEnum} from "../../models/TodoStatusEnum";
import {TimeStampEntities} from "../../../generics/timeStamp.entities";

@Entity('todo')
export class TodoEntity extends TimeStampEntities {
    @PrimaryGeneratedColumn("uuid")
    id:string;

    @Column()
    name: string;

    @Column()
    description: string;


    @Column({ type: 'enum', enum: TodoStatusEnum})
    status: TodoStatusEnum;

}
