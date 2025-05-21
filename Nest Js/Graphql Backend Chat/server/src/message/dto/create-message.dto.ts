// import { IsString } from 'class-validator';

// export class CreateMessageDto {
//   @IsString()
//   message: string;
// }

import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class SendMessageInput {
  @Field()
  room_name: string;

  @Field({ nullable: true })
  message: string;

  @Field({ nullable: true })
  username: string;
}

@InputType()
export class UpdateMessageInput {
  @Field()
  id: number;

  @Field({ nullable: true })
  message: string;
}


@InputType()
export class DeleteMessageInput {
  @Field()
  id: number;
}
