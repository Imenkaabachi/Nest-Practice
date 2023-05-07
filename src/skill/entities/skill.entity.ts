import {Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Cv} from "../../cv/entities/cv.entity";

@Entity('skill')
export class Skill {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    designation:string

    @ManyToMany(() => Cv, cv => cv.skills)
    cvs: Cv[];

}
