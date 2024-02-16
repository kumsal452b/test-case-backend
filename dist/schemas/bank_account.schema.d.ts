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
/// <reference types="mongoose/types/inferschematype" />
import { Types, Document } from 'mongoose';
export declare class BankAccount extends Document {
    site: Types.ObjectId;
    team: Types.ObjectId;
    paymentmethods: Types.ObjectId;
    name: string;
    account_number: string;
    daily_limit: number;
    min_transfer_amount: number;
    max_transfer_amount: number;
    status: number;
    details: {
        user_name: string;
        amount: number;
        last_balance: string;
        created_bank: string;
        created: Date;
    }[];
    logs: {
        timestamp: Date;
        message: string;
    }[];
    login: number;
    login_user: number;
    login_username: string;
    resume: number;
    created: Date;
    updated: Date;
    deleted: Date;
}
export declare const BankAccountSchema: import("mongoose").Schema<BankAccount, import("mongoose").Model<BankAccount, any, any, any, Document<unknown, any, BankAccount> & BankAccount & {
    _id: Types.ObjectId;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, BankAccount, Document<unknown, {}, BankAccount> & BankAccount & {
    _id: Types.ObjectId;
}>;
