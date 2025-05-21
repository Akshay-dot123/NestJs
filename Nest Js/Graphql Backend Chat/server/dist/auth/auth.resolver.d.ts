import { LoginUserInput } from 'src/user/dto/create-user.dto';
import { AuthService } from './auth.service';
import { UserService } from 'src/user/user.service';
export declare class AuthResolver {
    private readonly userService;
    private readonly authService;
    constructor(userService: UserService, authService: AuthService);
    login(loginInput: LoginUserInput, context: any): Promise<{
        access_token: string;
        room_name: string;
        user: {
            id: number;
            username: string;
        };
    }>;
}
