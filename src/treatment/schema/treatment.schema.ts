import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';

@Schema({ timestamps: true })
export class Treatment {
  @Prop({ type: SchemaTypes.ObjectId, ref: 'Patient', required: true })
  patient: string; // Referencia al modelo de paciente

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  date: Date;

  @Prop({ required: true })
  description: string;
}

export type TreatmentDocument = Treatment & Document;
export const TreatmentSchema = SchemaFactory.createForClass(Treatment);
