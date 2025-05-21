// import { PubSub } from 'graphql-subscriptions';

// export const pubsub = new PubSub();

import { Module } from '@nestjs/common';
import { PubSub } from 'graphql-subscriptions';
const pubSub = new PubSub();
@Module({
  providers: [
    {
      provide: 'PUB_SUB',
      // useValue: new PubSub() as PubSub<any>, // 👈 FIX: allow dynamic keys
      useValue: pubSub,
    },
  ],
  exports: ['PUB_SUB'],
})
export class PubSubModule {}