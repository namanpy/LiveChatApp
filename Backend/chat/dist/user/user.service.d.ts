import { Model } from 'mongoose';
import { User } from './schema/user.schema';
export declare class UserService {
    private readonly userModel;
    constructor(userModel: Model<User>);
    createUser(username: string, password: string): Promise<User>;
    findByUsername(username: string): Promise<User>;
    find(username: string, password: string): Promise<User>;
}
