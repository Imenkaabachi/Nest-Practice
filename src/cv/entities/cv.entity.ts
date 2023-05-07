import {Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {User} from "../../user/entities/user.entity";
// import {CvSkillEntity} from "../../cv-skill/entities/cv-skill.entity";
import {Skill} from "../../skill/entities/skill.entity";

@Entity('cv')
export class Cv {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;
    @Column()

    firstname: string;
    @Column()

    age: number;
    @Column()

    cin: string;
    @Column()

    job: string;
    @Column()

    path: string;

    //dima l many to one heya l obligatoire
    @ManyToOne(() => User,
            user => user.cvs)
    user: User;

    @ManyToMany(() => Skill, {cascade: true,eager:true})
    @JoinTable()
    skills: Skill[];

}
