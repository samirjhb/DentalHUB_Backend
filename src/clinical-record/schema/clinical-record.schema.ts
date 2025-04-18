import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';
import { PatientDocument } from 'src/patient/schema/patient.schema';

// Definimos el esquema para los tratamientos dentales
@Schema({ _id: false }) // Importante: _id: false para subesquemas
export class DentalTreatment {
  @Prop({ required: true })
  diagnosis: string;

  @Prop({ required: false })
  radiography: string;

  @Prop({ required: true })
  toothNumber: number;

  @Prop({ required: true })
  treatment: string;

  @Prop({ required: true })
  price: number;

  @Prop({
    required: true,
    default: 'Pendiente',
    enum: ['Pendiente', 'En proceso', 'Completado', 'Cancelado'],
  })
  status: string;

  @Prop({ required: false, default: 0 })
  deposit: number;

  @Prop({ required: true })
  appointmentDate: Date;

  @Prop({ required: false })
  observations: string;
}

// Crear el esquema para DentalTreatment
export const DentalTreatmentSchema =
  SchemaFactory.createForClass(DentalTreatment);

// Tipo para el documento de la ficha clínica
export type ClinicalRecordDocument = ClinicalRecord & Document;

// Tipo para el tratamiento dental (para uso en el servicio)
export type DentalTreatmentDocument = DentalTreatment;

@Schema({ timestamps: true })
export class ClinicalRecord {
  @Prop({ type: SchemaTypes.ObjectId, ref: 'Patient', required: true })
  patient: PatientDocument;

  @Prop({ type: [DentalTreatmentSchema], required: true })
  treatments: DentalTreatment[];

  @Prop({ required: false })
  attachments: string[];

  @Prop({ required: true })
  dentist: string;
}

export const ClinicalRecordSchema =
  SchemaFactory.createForClass(ClinicalRecord);
