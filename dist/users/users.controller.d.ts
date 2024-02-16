/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose" />
/// <reference types="mongoose/types/inferschematype" />
import { HttpStatus } from "@nestjs/common";
import { UsersService } from "./users.service";
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    private userRequestCounts;
    private userRequestTotalCounts;
    create(createUserDto: any): Promise<import("mongoose").Document<unknown, {}, import("../schemas/users.schema").Users> & import("../schemas/users.schema").Users & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    getUserStream(stream: string, req: Request): {
        stream_seq: number;
        status?: undefined;
        message?: undefined;
        group?: undefined;
        rate_limit_left?: undefined;
    } | {
        status: HttpStatus;
        message: string;
        stream_seq?: undefined;
        group?: undefined;
        rate_limit_left?: undefined;
    } | {
        message: string;
        group: number;
        rate_limit_left: number;
        stream_seq?: undefined;
        status?: undefined;
    };
}
