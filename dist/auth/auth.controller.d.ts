import { AuthService } from './auth.service';
import { LoginAuthDto } from './dto/login-auth.dto';
import { UsersService } from 'src/users/users.service';
export declare class AuthController {
    private readonly authService;
    private readonly usersService;
    constructor(authService: AuthService, usersService: UsersService);
    login(loginAuthDto: LoginAuthDto): Promise<{
        access_token: string;
    }>;
    getProfile(req: any): any;
}
