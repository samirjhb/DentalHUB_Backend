import { ApiProperty } from '@nestjs/swagger';

export class DentalExamDto {
  @ApiProperty()
  cavities: boolean;

  @ApiProperty()
  gumDisease: boolean;

  @ApiProperty()
  missingTeeth: string[];
}

export class DentalRadiographyDto {
  @ApiProperty()
  image: string;
}

export class CreateEvaluationDto {
  @ApiProperty()
  patient: string; // ID del paciente asociado a la evaluación

  @ApiProperty()
  date: Date;

  @ApiProperty({ type: () => DentalExamDto })
  dentalExam: DentalExamDto;

  @ApiProperty({ type: () => DentalRadiographyDto })
  dentalRadiography: DentalRadiographyDto;
}
