import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';
import { DiagnosticEvaluationDocument } from 'src/diagnostic-evaluation/schema/diagnostic-evaluation.schema';
import { Treatment } from 'src/treatment/schema/treatment.schema';

export type PatientDocument = Patient & Document;
@Schema({ timestamps: true })
export class Patient {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  rut: string;

  @Prop({ required: true })
  cel: number;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  record: string;

  @Prop({ required: true })
  birthDate: Date;

  @Prop({ type: [SchemaTypes.ObjectId], ref: 'DiagnosticEvaluation' })
  evaluations: DiagnosticEvaluationDocument[]; // Relación con los modelos de evaluación y diagnóstico

  @Prop({ type: [{ type: SchemaTypes.ObjectId, ref: 'Treatment' }] })
  treatments: Treatment[]; // Relación con los modelos de tratamiento
}
export const PatientSchema = SchemaFactory.createForClass(Patient);
