import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SpecialistModule } from './specialist/specialist.module';
import { PatientModule } from './patient/patient.module';
import { DiagnosticEvaluationModule } from './diagnostic-evaluation/diagnostic-evaluation.module';
import { TreatmentPlanModule } from './treatment-plan/treatment-plan.module';
import { TreatmentModule } from './treatment/treatment.module';
import { FollowUpModule } from './follow-up/follow-up.module';
import { BillingModule } from './billing/billing.module';

@Module({
  imports: [
    //CONFIGURACION DE ENV
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    SpecialistModule,
    PatientModule,
    DiagnosticEvaluationModule,
    TreatmentPlanModule,
    TreatmentModule,
    FollowUpModule,
    BillingModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
