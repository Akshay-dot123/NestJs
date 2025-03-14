import { Module } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ProfileResolver } from './profile.resolver';

@Module({
  providers: [ProfileService, ProfileResolver],
})
export class ProfileModule {}
