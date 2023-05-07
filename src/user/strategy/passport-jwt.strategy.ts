// import {ExtractJwt, Strategy} from 'passport-jwt';
// import {PassportStrategy} from '@nestjs/passport';
// import {Injectable, UnauthorizedException} from '@nestjs/common';
// import {SourceCode} from "eslint";
// import {ConfigService} from "@nestjs/config";
// import {PayloadInterface} from "../entities/interface/payload.interface";
// import {Repository} from "typeorm";
// import {User} from "../entities/user.entity";
// import {InjectRepository} from "@nestjs/typeorm";
//
// @Injectable()
// export class JwtStrategy extends PassportStrategy(Strategy) {
//     constructor(
//         private configService: ConfigService,
//         @InjectRepository(User)
//         private userRepository: Repository<User>
//     ) {
//         super({
//             jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//             ignoreExpiration: false,
//             secretOrKey: configService.get('SECRET'),
//         });
//     }
//
//     async validate(payload: PayloadInterface) {
//         const user = await this.userRepository.findOneBy({username: payload.username});
//
//         if (user){
//             const {password,salt, ...result}=user;
//             return result;
//         }else {
//             throw new UnauthorizedException();
//         }
//     }
// }