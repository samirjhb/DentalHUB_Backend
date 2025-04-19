import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CitasService } from './citas.service';
import { CitasController } from './citas.controller';
import { Cita, CitaSchema } from './entities/cita.entity';
import { Patient, PatientSchema } from '../patient/schema/patient.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Cita.name, schema: CitaSchema },
      { name: Patient.name, schema: PatientSchema }
    ]),
  ],
  controllers: [CitasController],
  providers: [CitasService],
})
export class CitasModule {}
