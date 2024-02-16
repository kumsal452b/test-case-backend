import { NestMiddleware } from "@nestjs/common";
import { Response, NextFunction } from "express";
export declare class RequestLimitMiddleware implements NestMiddleware {
    private userRequestCounts;
    use(req: any, res: Response, next: NextFunction): Response<any, Record<string, any>>;
}
