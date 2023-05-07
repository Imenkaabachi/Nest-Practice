import {MiddlewareConsumer, Module, NestModule, RequestMethod} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {TodoModule} from './todo/todo.module';
import {CommonModule} from './common/common.module';
import {TodoService} from "./todo/todo.service";
import {FirstMiddleware} from "./middlewares/first/first.middleware";
import {logger} from "./middlewares/logger";
import * as helmet from 'helmet';
import {TypeOrmModule} from "@nestjs/typeorm";
import * as dotenv from 'dotenv';
import {DataSource} from "typeorm";
import {ConfigService} from "@nestjs/config";
import {TodoEntity} from "./todo/entities/todo.entity/todo.entity";
import {UserModule} from './user/user.module';
import {CvModule} from './cv/cv.module';
import {SkillModule} from './skill/skill.module';
import {User} from "./user/entities/user.entity";
import {Cv} from "./cv/entities/cv.entity";
import {Skill} from "./skill/entities/skill.entity";
import {AuthentificationMiddleware} from "./middlewares/authentification/authentification.middleware";

dotenv.config();

@Module({
    imports: [TodoModule,
        CommonModule,
        TypeOrmModule.forRoot(
            {
                type: 'mysql',
                host: process.env.DB_HOST,
                port: parseInt(process.env.DB_PORT),
                username: process.env.DB_USER,
                password: process.env.DB_PASSWORD,
                database: 'nest-todo',
                autoLoadEntities: true,
                synchronize: true, //en mode dev pas en mode prod
                logging: true,
            }
        ),
        UserModule,
        CvModule,
        SkillModule,
    ],
    controllers: [AppController],
    providers: [AppService, ConfigService],
    exports: [AppService]
})
export class AppModule implements NestModule {
    constructor(private dataSource: DataSource) {
    }

    configure(consumer: MiddlewareConsumer): any {
        consumer.apply(FirstMiddleware).forRoutes(
            {path: 'todo', method: RequestMethod.GET},
            {path: 'todo*', method: RequestMethod.DELETE}//pour dire tout ce qui commence par todo
        )
            .apply(logger).forRoutes('')
        consumer.apply(AuthentificationMiddleware)
            .forRoutes(
                "todo",
                "cv",
                "skill",
                "user",
            )
    }


}
