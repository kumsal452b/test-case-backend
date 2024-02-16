"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const swagger_1 = require("@nestjs/swagger");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, {
        cors: {
            origin: '*',
        },
    });
    const AdapterHost = app.get(core_1.HttpAdapterHost);
    const config = new swagger_1.DocumentBuilder()
        .setTitle('API Documentation')
        .setDescription('API description')
        .setVersion('1.0')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config, {
        ignoreGlobalPrefix: false,
    });
    swagger_1.SwaggerModule.setup('api/documentation', app, document);
    await app.listen(3001);
}
bootstrap();
//# sourceMappingURL=main.js.map