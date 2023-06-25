import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';

export class DentalExam {
  @Prop({ required: true })
  cavities: boolean;

  @Prop({ required: true })
  gumDisease: boolean;

  @Prop({ type: [String] })
  missingTeeth: string[];
}

export class DentalRadiography {
  @Prop({ required: true })
  image: string;
}

@Schema({ timestamps: true })
export class DiagnosticEvaluation {
  @Prop({ type: SchemaTypes.ObjectId, ref: 'Patient', required: true })
  patient: string; // Referencia al modelo de paciente

  @Prop({ required: true })
  date: Date;

  @Prop({ required: true, type: DentalExam })
  dentalExam: DentalExam;

  @Prop({ required: true, type: DentalRadiography })
  dentalRadiography: DentalRadiography;
}

export type DiagnosticEvaluationDocument = DiagnosticEvaluation & Document;
export const DiagnosticEvaluationSchema =
  SchemaFactory.createForClass(DiagnosticEvaluation);
