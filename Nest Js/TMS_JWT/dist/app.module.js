"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const graphql_1 = require("@nestjs/graphql");
const apollo_1 = require("@nestjs/apollo");
const path_1 = require("path");
const typeorm_1 = require("@nestjs/typeorm");
const user_module_1 = require("./user/user.module");
const user_entity_1 = require("./user/entities/user.entity");
const project_module_1 = require("./project/project.module");
const project_entity_1 = require("./project/entities/project.entity");
const task_module_1 = require("./task/task.module");
const task_entity_1 = require("./task/entities/task.entity");
const task_user_entity_1 = require("./task/entities/task-user.entity");
const auth_module_1 = require("./auth/auth.module");
const graphql_subscriptions_1 = require("graphql-subscriptions");
const pubsub_module_1 = require("./pubsub.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            graphql_1.GraphQLModule.forRoot({
                driver: apollo_1.ApolloDriver,
                autoSchemaFile: (0, path_1.join)(process.cwd(), 'src/graphql-schema.gql'),
                subscriptions: {
                    'graphql-ws': true,
                },
                context: ({ req, res }) => ({ req, res }),
                playground: true,
            }),
            typeorm_1.TypeOrmModule.forRoot({
                type: 'mysql',
                host: process.env.DB_HOST || '127.0.0.1',
                port: Number(process.env.DB_PORT) || 3306,
                username: process.env.DB_USERNAME || 'akshay',
                password: process.env.DB_PASSWORD || 'E1719prbu',
                database: process.env.DB_NAME || 'prac-auth-tms',
                entities: [user_entity_1.User, project_entity_1.Project, task_entity_1.Task, task_user_entity_1.TaskUser],
                synchronize: true,
            }),
            pubsub_module_1.PubSubModule,
            user_module_1.UserModule,
            auth_module_1.AuthModule,
            project_module_1.ProjectModule,
            task_module_1.TaskModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [
            app_service_1.AppService,
            {
                provide: 'PUB_SUB',
                useValue: new graphql_subscriptions_1.PubSub(),
            },
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map