import { Injectable } from '@nestjs/common';
import { CreateSkillDto } from './dto/create-skill.dto';
import { UpdateSkillDto } from './dto/update-skill.dto';
import {Repository} from "typeorm";
import {Skill} from "./entities/skill.entity";
import {InjectRepository} from "@nestjs/typeorm";

@Injectable()
export class SkillService {
  constructor(
      @InjectRepository(Skill)
      private skillRepository : Repository<Skill>
  ) {}

  create(createSkillDto: CreateSkillDto) {
    const skill = this.skillRepository.create(createSkillDto)
    return this.skillRepository.save(skill)
  }

  findAll() {
    return  this.skillRepository.find();
  }

  findOne(id: string) {
    return  this.skillRepository.findOneBy({id});
  }

  update(id: string, updateSkillDto: UpdateSkillDto) {
    return  this.skillRepository.update(id, updateSkillDto);
  }

  remove(id: string) {
    return  this.skillRepository.delete(id);
  }
}
