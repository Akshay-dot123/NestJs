import { RoomService } from './room.service';
import { UserService } from 'src/user/user.service';
export declare class RoomResolver {
    private readonly roomService;
    private readonly userService;
    constructor(roomService: RoomService, userService: UserService);
}
