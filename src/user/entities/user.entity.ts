import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Cv} from "../../cv/entities/cv.entity";

@Entity('user')
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        length:50,
        unique:true
    })
    username:string;

    @Column({
        unique:true
    })
    email:string;

    @Column({
        length:8
    })
    password:string;

    @Column()
    salt:string;

    @OneToMany(() => Cv,
            cv => cv.user)
    cvs: Cv[];
}
