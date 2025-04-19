import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';
import { DiagnosticEvaluationDocument } from 'src/diagnostic-evaluation/schema/diagnostic-evaluation.schema';

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

  @Prop({ required: false })
  record: string;

  @Prop({ required: true })
  birthDate: Date;

  @Prop({ type: [SchemaTypes.ObjectId], ref: 'DiagnosticEvaluation' })
  evaluations: DiagnosticEvaluationDocument[]; // Relación con los modelos de evaluación y diagnóstico

  @Prop({ type: [SchemaTypes.ObjectId], ref: 'ClinicalRecord' })
  clinicalRecords: any[]; // Relación con las fichas clínicas
}
export const PatientSchema = SchemaFactory.createForClass(Patient);
