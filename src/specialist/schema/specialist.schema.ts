import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type SpecialistDocument = Specialist & Document;

@Schema({ timestamps: true })
export class Specialist {
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

  @Prop({ required: true })
  specialty: string;
}
export const SpecialistSchema = SchemaFactory.createForClass(Specialist);
