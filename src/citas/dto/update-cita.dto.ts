import { PartialType } from '@nestjs/swagger';
import { CreateCitaDto } from './create-cita.dto';

export class UpdateCitaDto extends PartialType(CreateCitaDto) {}
