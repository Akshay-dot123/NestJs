import { UseGuards } from '@nestjs/common';
import { Query, Resolver } from '@nestjs/graphql';
import { GqlJwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Resolver()
export class ProfileResolver {
  @UseGuards(GqlJwtAuthGuard)
  @Query(() => String, { name: 'findAllProfile' })
  findAll() {
    return 'Hi';
  }
  @Query(() => String, { name: 'findByProfileId' })
  findById() {
    return 'Id';
  }
}
