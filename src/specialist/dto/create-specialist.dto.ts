import { ApiProperty } from '@nestjs/swagger';

export class CreateSpecialistDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  rut: string;

  @ApiProperty()
  cel: number;

  @ApiProperty()
  email: string;

  @ApiProperty()
  record: string;

  @ApiProperty()
  birthDate: Date;

  @ApiProperty()
  specialty: string;
}
