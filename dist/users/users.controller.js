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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("./users.service");
const auth_guard_1 = require("../auth/auth.guard");
const common_2 = require("@nestjs/common");
let UsersController = class UsersController {
    constructor(usersService) {
        this.usersService = usersService;
        this.userRequestCounts = new Map();
        this.userRequestTotalCounts = new Map();
    }
    create(createUserDto) {
        return this.usersService.create(createUserDto);
    }
    getUserStream(stream, req) {
        const userId = req.user?.sub;
        const hash = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        const userIdHash = userId.substring(userId.length - 1, userId.length);
        if (stream === "false") {
            return {
                stream_seq: 0,
            };
        }
        if (userId) {
            if (!this.userRequestCounts.has(userId)) {
                this.userRequestCounts.set(userId, 1);
                const oldCount = this.userRequestTotalCounts.get(userId);
                this.userRequestTotalCounts.set(userId, (oldCount ? oldCount : 0) + 1);
            }
            else {
                const count = this.userRequestCounts.get(userId);
                if (count >= 4) {
                    return {
                        status: common_1.HttpStatus.TOO_MANY_REQUESTS,
                        message: "Çok fazla istek gönderildi. Lütfen bir dakika sonra tekrar deneyin.",
                    };
                }
                this.userRequestCounts.set(userId, count + 1);
                const oldCount = this.userRequestTotalCounts.get(userId);
                this.userRequestTotalCounts.set(userId, (oldCount ? oldCount : 0) + 1);
            }
            setTimeout(() => {
                this.userRequestCounts.delete(userId);
            }, 60000);
        }
        return {
            message: `Hi Welcome to our stream ${req.user.name}. This is your visit ${this.userRequestTotalCounts.get(userId)}`,
            group: hash[isNaN(userIdHash) ? 0 : userIdHash],
            rate_limit_left: 4 -
                (this.userRequestCounts.get(userId)
                    ? this.userRequestCounts.get(userId)
                    : 0),
        };
    }
};
exports.UsersController = UsersController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "create", null);
__decorate([
    (0, common_1.Get)("stream"),
    (0, common_2.UseGuards)(auth_guard_1.AuthGuard),
    __param(0, (0, common_1.Query)("stream")),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Request]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "getUserStream", null);
exports.UsersController = UsersController = __decorate([
    (0, common_1.Controller)("users"),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], UsersController);
//# sourceMappingURL=users.controller.js.map