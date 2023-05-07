import { Module } from '@nestjs/common';
import { CvService } from './cv.service';
import { CvController } from './cv.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Cv} from "./entities/cv.entity";
import {CommonModule} from "../common/common.module";
import {SkillModule} from "../skill/skill.module";

@Module({
  imports:[CommonModule,TypeOrmModule.forFeature([Cv]),SkillModule],
  controllers: [CvController],
  providers: [CvService]
})
export class CvModule {}
