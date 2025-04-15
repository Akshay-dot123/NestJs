import { LoginUserInput } from 'src/user/dto/create-user.input';
import { AuthService } from './auth.service';
export declare class AuthResolver {
    private readonly authService;
    constructor(authService: AuthService);
    login(loginInput: LoginUserInput, context: any): Promise<string>;
}
