import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Patient } from '../../patient/schema/patient.schema';

@Schema({ timestamps: true })
export class Cita extends Document {
  @Prop({ required: true, type: Types.ObjectId, ref: Patient.name })
  paciente: Types.ObjectId | Patient;

  @Prop({ required: true })
  fecha: Date;

  @Prop({ required: true })
  hora: string;

  @Prop({ default: false })
  completada: boolean;

  @Prop({ default: false })
  cancelada: boolean;
}

export const CitaSchema = SchemaFactory.createForClass(Cita);
