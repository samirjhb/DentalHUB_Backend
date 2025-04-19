import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CitasService } from './citas.service';
import { CreateCitaDto } from './dto/create-cita.dto';
import { UpdateCitaDto } from './dto/update-cita.dto';

@Controller('citas')
export class CitasController {
  constructor(private readonly citasService: CitasService) {}

  @Post()
  create(@Body() createCitaDto: CreateCitaDto) {
    return this.citasService.create(createCitaDto);
  }

  @Get()
  findAll() {
    return this.citasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.citasService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCitaDto: UpdateCitaDto) {
    return this.citasService.update(id, updateCitaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.citasService.remove(id);
  }
}
