"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestLimitMiddleware = void 0;
const common_1 = require("@nestjs/common");
let RequestLimitMiddleware = class RequestLimitMiddleware {
    constructor() {
        this.userRequestCounts = new Map();
    }
    use(req, res, next) {
        const userId = req?.user?.id;
        if (userId) {
            if (!this.userRequestCounts.has(userId)) {
                this.userRequestCounts.set(userId, 1);
            }
            else {
                const count = this.userRequestCounts.get(userId);
                if (count >= 4) {
                    return res.status(common_1.HttpStatus.TOO_MANY_REQUESTS).json({
                        message: "Çok fazla istek gönderildi. Lütfen bir dakika sonra tekrar deneyin.",
                    });
                }
                this.userRequestCounts.set(userId, count + 1);
            }
            setTimeout(() => {
                this.userRequestCounts.delete(userId);
            }, 60000);
        }
        next();
    }
};
exports.RequestLimitMiddleware = RequestLimitMiddleware;
exports.RequestLimitMiddleware = RequestLimitMiddleware = __decorate([
    (0, common_1.Injectable)()
], RequestLimitMiddleware);
//# sourceMappingURL=RequestLimitMiddleware.js.map