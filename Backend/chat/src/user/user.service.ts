import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schema/user.schema';
@Injectable()
export class UserService {

    constructor(@InjectModel('User') private readonly userModel : Model<User> ) {}

    async createUser(username : string, password : string) : Promise<User> {

        if(! (await this.findByUsername(username)) ) {

            let user =  new this.userModel({
                username : username,
                password : password
            });

            await user.save();

            return user;
        } else {
            throw new BadRequestException("Username already exists.");
        }

    }

    async findByUsername(username : string): Promise<User>  {

        return await this.userModel.findOne({ username : username }).exec();
    }

    async find(username : string, password : string): Promise<User>  {

        let user = await this.userModel.findOne({ username : username , password}).exec();
        if(!user) {
            throw new UnauthorizedException('No user found.')
        }

        return user;
    }

}
