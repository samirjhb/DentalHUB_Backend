import { IsDateString, IsMongoId, IsString, Matches } from 'class-validator';

export class CreateCitaDto {
  @IsMongoId()
  paciente: string;

  @IsDateString()
  fecha: string;

  @IsString()
  @Matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, {
    message: 'La hora debe estar en formato HH:MM (24 horas)',
  })
  hora: string;
}
