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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const users_schema_1 = require("../schemas/users.schema");
const bcrypt = require("bcrypt");
let UsersService = class UsersService {
    constructor(UsersModel) {
        this.UsersModel = UsersModel;
    }
    async findOne(email) {
        return this.UsersModel.findOne({ email: email });
    }
    async create(createUserDto) {
        let user = await this.UsersModel.findOne({ email: createUserDto.email });
        if (user) {
            throw new Error("User already exists");
        }
        if (!createUserDto.password) {
            throw new Error("Password is required");
        }
        if (!createUserDto.email) {
            throw new Error("Email is required");
        }
        if (!createUserDto.user_name) {
            throw new Error("User name is required");
        }
        createUserDto.password = await bcrypt.hashSync(createUserDto.password, 10);
        return this.UsersModel.create(createUserDto);
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(users_schema_1.Users.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], UsersService);
//# sourceMappingURL=users.service.js.map