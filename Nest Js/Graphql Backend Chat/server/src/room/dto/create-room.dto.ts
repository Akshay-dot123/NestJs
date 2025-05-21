import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class GetRoomMessageInput {
  @Field()
  room_name: string;

  @Field({ nullable: true })
  message: string;

  @Field({ nullable: true })
  username: string;
}
