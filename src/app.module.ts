import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SpecialistModule } from './specialist/specialist.module';
import { PatientModule } from './patient/patient.module';
import { DiagnosticEvaluationModule } from './diagnostic-evaluation/diagnostic-evaluation.module';
import { BillingModule } from './billing/billing.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { JwtStrategy } from './auth/utils/jwt.strategy';
import { WhatsappModule } from './whatsapp/whatsapp.module';
import { ClinicalRecordModule } from './clinical-record/clinical-record.module';
import { AiModule } from './ai/ai.module';

@Module({
  imports: [
    //CONFIGURACION DE ENV
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    //Conection mongodb
    MongooseModule.forRoot(process.env.MONGO_CONNECTION_TEST),
    SpecialistModule,
    PatientModule,
    DiagnosticEvaluationModule,
    BillingModule,
    AuthModule,
    WhatsappModule,
    ClinicalRecordModule,
    AiModule,
  ],
  controllers: [],
  providers: [JwtStrategy],
})
export class AppModule {}
