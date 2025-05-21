"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageModule = void 0;
const common_1 = require("@nestjs/common");
const message_service_1 = require("./message.service");
const message_entity_1 = require("./entities/message.entity");
const typeorm_1 = require("@nestjs/typeorm");
const message_resolver_1 = require("./message.resolver");
const room_entity_1 = require("../room/entities/room.entity");
const user_entity_1 = require("../user/entities/user.entity");
const room_service_1 = require("../room/room.service");
const user_service_1 = require("../user/user.service");
const pubsub_1 = require("../pubsub");
let MessageModule = class MessageModule {
};
exports.MessageModule = MessageModule;
exports.MessageModule = MessageModule = __decorate([
    (0, common_1.Module)({
        exports: [message_service_1.MessageService],
        imports: [typeorm_1.TypeOrmModule.forFeature([message_entity_1.Message, room_entity_1.Room, user_entity_1.User]), pubsub_1.PubSubModule],
        providers: [message_service_1.MessageService, message_resolver_1.MessageResolver, room_service_1.RoomService, user_service_1.UserService],
    })
], MessageModule);
//# sourceMappingURL=message.module.js.map