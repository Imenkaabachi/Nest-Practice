import {
    randEmail,
    randFilePath,
    randFirstName,
    randJobTitle,
    randLastName,
    randNumber,
    randPassword,
    randSkill,
    randUserName
} from '@ngneat/falso';
import {NestFactory} from "@nestjs/core";
import {AppModule} from "../app.module";
import {User} from "../user/entities/user.entity";
import {Skill} from "../skill/entities/skill.entity";
import {Cv} from "../cv/entities/cv.entity";
import {UserService} from "../user/user.service";
import {SkillService} from "../skill/skill.service";
import {CvService} from "../cv/cv.service";

async function bootstrap() {
    const app = await NestFactory.createApplicationContext(AppModule);
    const userService: UserService = app.get(UserService);
    const skillService: SkillService = app.get(SkillService);
    const cvService: CvService = app.get(CvService);


    // Créer des utilisateurs fictifs
    const users: User[] = []
    for (let i = 0; i < 20; i++) {
        const user =  await userService.create({
            email: randEmail(),
            password: randPassword(),
            username: randUserName(),
        });
        users.push( user)
    }

    // Créer des compétences fictives
    const skills: Skill[] = []
    for (let i = 0; i < 20; i++) {
        const skill = new Skill();
        skill.designation = randSkill();
        await skillService.create(skill);
        skills.push(skill);
    }

    //creer des cv fictifs
    for (let i = 0; i < 20; i++) {
        const cv = new Cv();
        cv.age = randNumber({ min: 18, max: 100 });
        cv.job = randJobTitle();
        cv.firstname = randFirstName();
        cv.name = randLastName();
        cv.path = randFilePath();
        cv.cin = randNumber({ min: 100000000, max: 999999999 }).toString();

        const owner = users[randNumber({min: 0, max: users.length})];
        const randSkill = skills[randNumber({min: 0, max: skills.length})];
        await cvService.create(cv, owner);
        await cvService.addSkill(cv.id, {skillId: randSkill.id});
    }
    await app.close()

}

bootstrap();