import { Module } from '@nestjs/common';
import { FollowUpService } from './follow-up.service';
import { FollowUpController } from './follow-up.controller';

@Module({
  controllers: [FollowUpController],
  providers: [FollowUpService]
})
export class FollowUpModule {}
