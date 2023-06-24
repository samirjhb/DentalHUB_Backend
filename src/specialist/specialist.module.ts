import { Module } from '@nestjs/common';
import { SpecialistService } from './specialist.service';
import { SpecialistController } from './specialist.controller';

@Module({
  controllers: [SpecialistController],
  providers: [SpecialistService],
})
export class SpecialistModule {}
