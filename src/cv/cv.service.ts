import {Injectable} from '@nestjs/common';
import {CreateCvDto} from './dto/create-cv.dto';
import {UpdateCvDto} from './dto/update-cv.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {Cv} from "./entities/cv.entity";
import {Repository} from "typeorm";
import {SkillService} from "../skill/skill.service";
import {User} from "../user/entities/user.entity";
import {AddSkillCvDto} from "./dto/add-skill-cv.dto";

@Injectable()
export class CvService {
    constructor(
        @InjectRepository(Cv)
        private readonly cvRepository: Repository<Cv>,
        private readonly skillService: SkillService,
    ) {
    }

    create(createCvDto: CreateCvDto, user: User) {
        const newCv = this.cvRepository.create(createCvDto)
        newCv.user = user;
        return this.cvRepository.save(newCv);
    }

    async addSkill(id: string, addSkillDto: AddSkillCvDto) {
        const skill = await this.skillService.findOne(addSkillDto.skillId);
        const cv = await this.cvRepository.findOneBy({id});
        cv.skills.push(skill)
        return this.cvRepository.save(cv);
    }

    findAll() {
        return this.cvRepository.find()
    }

    findOne(id: string) {
        return this.cvRepository.findOneBy({id})
    }

    update(id: string, updateCvDto: UpdateCvDto) {
        return this.cvRepository.update(id, updateCvDto)
    }

    remove(id: string) {
        return this.cvRepository.delete(id)
    }
}
