"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthGuard = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const users_service_1 = require("../users/users.service");
let AuthGuard = class AuthGuard {
    constructor(jwtService, userService) {
        this.jwtService = jwtService;
        this.userService = userService;
    }
    async canActivate(context) {
        const request = context.switchToHttp().getRequest();
        let token = this.extractTokenFromHeader(request);
        if (token) {
            let theFirstCheck = token.substring(0, token.indexOf("ey"));
            if (theFirstCheck !== "") {
                token = token.replaceAll(theFirstCheck, "");
                if (theFirstCheck.includes("USER")) {
                    let theCheckNumber = theFirstCheck.replaceAll("USER", "");
                    if (isNaN(Number(theCheckNumber))) {
                        throw new common_1.UnauthorizedException();
                    }
                    else {
                        if (theCheckNumber.length !== 3) {
                            throw new common_1.UnauthorizedException();
                        }
                    }
                }
                else {
                    throw new common_1.UnauthorizedException();
                }
            }
            else {
                throw new common_1.UnauthorizedException();
            }
        }
        if (!token) {
            throw new common_1.UnauthorizedException();
        }
        try {
            const payload = await this.jwtService.verifyAsync(token, {
                secret: process.env.JWT_SECRET,
            });
            request.user = payload;
            return true;
        }
        catch (error) {
            throw new common_1.UnauthorizedException(error.message);
        }
    }
    extractTokenFromHeader(request) {
        const [type, token] = request.headers.authorization?.split(" ") ?? [];
        return type === "Bearer" ? token : undefined;
    }
};
exports.AuthGuard = AuthGuard;
exports.AuthGuard = AuthGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        users_service_1.UsersService])
], AuthGuard);
//# sourceMappingURL=auth.guard.js.map