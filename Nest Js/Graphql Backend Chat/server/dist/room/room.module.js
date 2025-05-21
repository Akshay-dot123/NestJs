"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoomModule = void 0;
const common_1 = require("@nestjs/common");
const room_service_1 = require("./room.service");
const typeorm_1 = require("@nestjs/typeorm");
const room_entity_1 = require("./entities/room.entity");
const room_resolver_1 = require("./room.resolver");
const user_entity_1 = require("../user/entities/user.entity");
const user_service_1 = require("../user/user.service");
let RoomModule = class RoomModule {
};
exports.RoomModule = RoomModule;
exports.RoomModule = RoomModule = __decorate([
    (0, common_1.Module)({
        exports: [room_service_1.RoomService],
        imports: [typeorm_1.TypeOrmModule.forFeature([room_entity_1.Room, user_entity_1.User])],
        providers: [room_service_1.RoomService, room_resolver_1.RoomResolver, user_service_1.UserService],
    })
], RoomModule);
//# sourceMappingURL=room.module.js.map