import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ClinicalRecordService } from './clinical-record.service';
import { ClinicalRecordController } from './clinical-record.controller';
import {
  ClinicalRecord,
  ClinicalRecordSchema,
} from './schema/clinical-record.schema';
import { PatientSchema } from 'src/patient/schema/patient.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ClinicalRecord.name, schema: ClinicalRecordSchema },
      { name: 'Patient', schema: PatientSchema },
    ]),
  ],
  controllers: [ClinicalRecordController],
  providers: [ClinicalRecordService],
  exports: [ClinicalRecordService],
})
export class ClinicalRecordModule {}
