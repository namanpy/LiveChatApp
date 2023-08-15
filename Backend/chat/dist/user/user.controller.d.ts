import { UserService } from './user.service';
import { UserDTO } from './dto/user.dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    createUser(user: UserDTO): Promise<{
        message: string;
    }>;
    loginUser(user: UserDTO): Promise<{
        message: string;
        token: any;
    }>;
    testAuth(request: any): Promise<{
        message: string;
        token: any;
    }>;
}
