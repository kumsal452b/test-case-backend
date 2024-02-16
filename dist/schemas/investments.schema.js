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
exports.InvestmentSchema = exports.Investment = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let Investment = class Investment {
};
exports.Investment = Investment;
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'Site' }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Investment.prototype, "site", void 0);
__decorate([
    (0, mongoose_1.Prop)({ index: true }),
    __metadata("design:type", Number)
], Investment.prototype, "status", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Number)
], Investment.prototype, "amount", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'PaymentMethod' }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Investment.prototype, "payment_method", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Investment.prototype, "transaction_id", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'Investor' }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Investment.prototype, "user", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'Team' }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Investment.prototype, "team", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'BankAccount' }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Investment.prototype, "bank_account", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [{ timestamp: Date, message: String }] }),
    __metadata("design:type", Array)
], Investment.prototype, "logs", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Date, default: Date.now }),
    __metadata("design:type", Date)
], Investment.prototype, "created", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Date }),
    __metadata("design:type", Date)
], Investment.prototype, "updated", void 0);
exports.Investment = Investment = __decorate([
    (0, mongoose_1.Schema)()
], Investment);
exports.InvestmentSchema = mongoose_1.SchemaFactory.createForClass(Investment);
//# sourceMappingURL=investments.schema.js.map