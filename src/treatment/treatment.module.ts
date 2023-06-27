import { Module } from '@nestjs/common';
import { TreatmentService } from './treatment.service';
import { TreatmentController } from './treatment.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Treatment, TreatmentSchema } from './schema/treatment.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Treatment.name,
        schema: TreatmentSchema,
      },
    ]),
  ],
  controllers: [TreatmentController],
  providers: [TreatmentService],
})
export class TreatmentModule {}
