import { Injectable, NestMiddleware, HttpStatus } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";

@Injectable()
export class RequestLimitMiddleware implements NestMiddleware {
  private userRequestCounts = new Map<string, number>();

  use(req: any, res: Response, next: NextFunction) {
    const userId = req?.user?.id; // Kullanıcı kimlik bilgisi gibi bir şeyi buraya ekleyin
    if (userId) {
      if (!this.userRequestCounts.has(userId)) {
        this.userRequestCounts.set(userId, 1);
      } else {
        const count = this.userRequestCounts.get(userId);

        if (count >= 4) {
          return res.status(HttpStatus.TOO_MANY_REQUESTS).json({
            message:
              "Çok fazla istek gönderildi. Lütfen bir dakika sonra tekrar deneyin.",
          });
        }

        this.userRequestCounts.set(userId, count + 1);
      }

      setTimeout(() => {
        this.userRequestCounts.delete(userId);
      }, 60000); // 1 dakika
    }
    next();
  }
}
