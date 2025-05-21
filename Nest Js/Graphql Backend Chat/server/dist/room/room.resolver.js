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
exports.RoomResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const room_entity_1 = require("./entities/room.entity");
const room_service_1 = require("./room.service");
const user_service_1 = require("../user/user.service");
let RoomResolver = class RoomResolver {
    roomService;
    userService;
    constructor(roomService, userService) {
        this.roomService = roomService;
        this.userService = userService;
    }
};
exports.RoomResolver = RoomResolver;
exports.RoomResolver = RoomResolver = __decorate([
    (0, graphql_1.Resolver)(() => room_entity_1.Room),
    __metadata("design:paramtypes", [room_service_1.RoomService,
        user_service_1.UserService])
], RoomResolver);
//# sourceMappingURL=room.resolver.js.map