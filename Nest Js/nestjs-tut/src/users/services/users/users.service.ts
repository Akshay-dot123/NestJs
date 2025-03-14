// import { Injectable } from '@nestjs/common';
// import { User } from 'src/users/types/User';

// @Injectable()
// export class UsersService {
//   create(user: User) {
//     throw new Error('Method not implemented.');
//   }
//   users: User[] = [
//     {
//       username: 'Akshay',
//       password: 'sad',
//     },
//     {
//       username: 'Prabhu',
//       password: 'Pr@123',
//     },
//     {
//       username: 'Yogi',
//       password: 'Yg@123',
//     },
//   ];
//   getUsers() {
//     return this.users.map((user) => ({
//       username: user.username,
//     }));
//   }
//   getUserByName(username: string) {
//     return this.users.find((user) => user.username === username);
//   }
// }

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from '../../user.model';
import { validateOrReject } from 'class-validator';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private readonly userModel: typeof User) {}

  getUsers() {
    return this.userModel.findAll();
  }

  getUserByName(username: string) {
    return this.userModel.findOne({ where: { name: username } });
  }

  async create(createCustomer: User): Promise<User> {
    const user = new User();
    user.name = createCustomer.name;
    user.email = createCustomer.email;

    // Validate the incoming DTO (this ensures the DTO fields are valid)
    await validateOrReject(user); // Will throw an error if validation fails
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const userPlain = user.get({ plain: true });

    // Create and return the user in the database
    return this.userModel.create(userPlain);
  }

  findUser(username: string) {
    return this.userModel.findOne({ where: { name: username } });
  }
}
