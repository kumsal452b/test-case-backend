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
exports.BankAccountSchema = exports.BankAccount = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let BankAccount = class BankAccount extends mongoose_2.Document {
};
exports.BankAccount = BankAccount;
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'Site' }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], BankAccount.prototype, "site", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'Team' }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], BankAccount.prototype, "team", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'PaymentMethod' }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], BankAccount.prototype, "paymentmethods", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], BankAccount.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], BankAccount.prototype, "account_number", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Number)
], BankAccount.prototype, "daily_limit", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Number)
], BankAccount.prototype, "min_transfer_amount", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Number)
], BankAccount.prototype, "max_transfer_amount", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Number)
], BankAccount.prototype, "status", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: [
            {
                user_name: String,
                amount: Number,
                last_balance: String,
                created_bank: String,
                created: {
                    type: Date,
                    default: Date.now,
                },
            },
        ],
    }),
    __metadata("design:type", Array)
], BankAccount.prototype, "details", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [{ timestamp: Date, message: String }] }),
    __metadata("design:type", Array)
], BankAccount.prototype, "logs", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Number)
], BankAccount.prototype, "login", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Number)
], BankAccount.prototype, "login_user", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], BankAccount.prototype, "login_username", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Number)
], BankAccount.prototype, "resume", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Date, default: Date.now }),
    __metadata("design:type", Date)
], BankAccount.prototype, "created", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Date }),
    __metadata("design:type", Date)
], BankAccount.prototype, "updated", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Date }),
    __metadata("design:type", Date)
], BankAccount.prototype, "deleted", void 0);
exports.BankAccount = BankAccount = __decorate([
    (0, mongoose_1.Schema)()
], BankAccount);
exports.BankAccountSchema = mongoose_1.SchemaFactory.createForClass(BankAccount);
//# sourceMappingURL=bank_account.schema.js.map