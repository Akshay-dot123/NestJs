import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { UserOutput } from 'src/user/dto/create-user.dto';
import { User } from 'src/user/entities/user.entity';

@ObjectType()
export class LoginResponse {
  @Field()
  access_token: string;
  @Field()
  room_name: string;

  @Field(() => UserOutput)
  user: UserOutput;

  //   @Field(() => User)
  //   user: User;
}
