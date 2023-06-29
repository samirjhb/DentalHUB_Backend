import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SpecialistModule } from './specialist/specialist.module';
import { PatientModule } from './patient/patient.module';
import { DiagnosticEvaluationModule } from './diagnostic-evaluation/diagnostic-evaluation.module';
import { TreatmentPlanModule } from './treatment-plan/treatment-plan.module';
import { TreatmentModule } from './treatment/treatment.module';
import { FollowUpModule } from './follow-up/follow-up.module';
import { BillingModule } from './billing/billing.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { JwtStrategy } from './auth/utils/jwt.strategy';

@Module({
  imports: [
    //CONFIGURACION DE ENV
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    //Conection mongodb
    MongooseModule.forRoot(process.env.MONGO_CONNECTION_PRODUCTION),
    SpecialistModule,
    PatientModule,
    DiagnosticEvaluationModule,
    TreatmentPlanModule,
    TreatmentModule,
    FollowUpModule,
    BillingModule,
    AuthModule,
  ],
  controllers: [],
  providers: [JwtStrategy],
})
export class AppModule {}
