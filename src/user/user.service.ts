import {ConflictException, Injectable, NotFoundException} from '@nestjs/common';
import {CreateUserDto} from './dto/create-user.dto';
import {UpdateUserDto} from './dto/update-user.dto';
import {UserSubscribeDto} from "./dto/user-subscribe.dto";
import {Repository} from "typeorm";
import {User} from "./entities/user.entity";
import {InjectRepository} from "@nestjs/typeorm";
import * as bcrypt from 'bcrypt';
import {LoginCredentialDto} from "./dto/login-credential.dto";
import {JwtService} from "@nestjs/jwt";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        // private jwtService: JwtService
    ) {
    }

    async create(createUserDto: CreateUserDto) {
        const user = new User();
        user.email = createUserDto.email;
        user.username = createUserDto.username;
        user.salt = bcrypt.genSaltSync();
        user.password = await bcrypt.hash(createUserDto.password, user.salt);
        return this.userRepository.save(user);
    }

    async findAll() {
        return await this.userRepository.find();
    }

    async findOne(id: string) {
        const user = await this.userRepository.findOne({ where: [{ id: id }] });
        if(!user) throw new NotFoundException("User not found.");
        return user;
    }

    async update(id: string, updateUserDto: UpdateUserDto) {
        const user = await this.userRepository.findOne({ where: [{ id: id }] });
        if(updateUserDto.password){
            user.salt = bcrypt.genSaltSync();
            user.password = await bcrypt.hash(updateUserDto.password, user.salt);
        }
        user.email = updateUserDto.email ?? user.email;
        user.username = updateUserDto.username ?? user.username;
        return this.userRepository.save(user);}

    // async register(userData: UserSubscribeDto): Promise<Partial<User>> {
    //     const user = this.userRepository.create({
    //         ...userData
    //     });
    //     user.salt = await bcrypt.genSalt();
    //     user.password = await bcrypt.hash(user.password, user.salt);
    //     try {
    //         await this.userRepository.save(user);
    //     } catch (e) {
    //         throw new ConflictException('Username and password have to be unique!!')
    //     }
    //     return {
    //         id: user.id,
    //         username: user.username,
    //         email: user.email,
    //         password: user.password
    //     };
    //
    // }
    //
    // async login(credentials : LoginCredentialDto):Promise<Partial<User>>{
    //
    //     //recuperer le login et le mdp: on peut se logger via le username ou email
    //     const {username,password}=credentials;
    //     //verifier s il y a un user avec ce login ou email
    //     const user=await this.userRepository.createQueryBuilder("user")
    //         .where("user.username = :username or user.email = :username",{
    //             username
    //         })
    //         .getOne();
    //     //si non je declenche une erreur
    //     if(!user)
    //         throw new NotFoundException("username ou password errone")
    //     //si oui je verifie que le mdp est correct
    //     const hashPassword = await bcrypt.hash(password,user.salt);
    //     if(hashPassword===user.password){
    //         return {
    //             username,
    //             email : user.email
    //         }
    //     }
    //     // si mdp incorrect je declenche une erreur
    //     else{
    //         throw new NotFoundException("username ou password errone")
    //     }
    //
    // }
    //
    // async loginV2(credentials : LoginCredentialDto){
    //
    //     //recuperer le login et le mdp: on peut se logger via le username ou email
    //     const {username,password}=credentials;
    //     //verifier s il y a un user avec ce login ou email
    //     const user=await this.userRepository.createQueryBuilder("user")
    //         .where("user.username = :username or user.email = :username",{
    //             username
    //         })
    //         .getOne();
    //     //si non je declenche une erreur
    //     if(!user)
    //         throw new NotFoundException("username ou password errone")
    //     //si oui je verifie que le mdp est correct
    //     const hashedPassword = await bcrypt.hash(password,user.salt);
    //     if(hashedPassword===user.password){
    //         const payload = {
    //             username,
    //             email : user.email
    //         };
    //         const jwt =  this.jwtService.sign(payload);
    //         return {
    //             "access_token" : jwt
    //         };
    //
    //     }
    //     // si mdp incorrect je declenche une erreur
    //     else{
    //         throw new NotFoundException("username ou password errone")
    //     }
    //
    // }
}
