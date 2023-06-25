import { Module } from '@nestjs/common';
import { SpecialistService } from './specialist.service';
import { SpecialistController } from './specialist.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Specialist, SpecialistSchema } from './schema/specialist.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Specialist.name,
        schema: SpecialistSchema,
      },
    ]),
  ],
  controllers: [SpecialistController],
  providers: [SpecialistService],
})
export class SpecialistModule {}
