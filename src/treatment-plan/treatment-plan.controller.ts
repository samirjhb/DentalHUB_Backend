import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { TreatmentPlanService } from './treatment-plan.service';
import { CreateTreatmentPlanDto } from './dto/create-treatment-plan.dto';
import { UpdateTreatmentPlanDto } from './dto/update-treatment-plan.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/utils/jwt-auth.guard';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiTags('Plan de tratamiento')
@Controller('treatment-plan')
export class TreatmentPlanController {
  constructor(private readonly treatmentPlanService: TreatmentPlanService) {}

  @Post()
  create(@Body() createTreatmentPlanDto: CreateTreatmentPlanDto) {
    return this.treatmentPlanService.create(createTreatmentPlanDto);
  }

  @Get()
  findAll() {
    return this.treatmentPlanService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.treatmentPlanService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTreatmentPlanDto: UpdateTreatmentPlanDto,
  ) {
    return this.treatmentPlanService.update(+id, updateTreatmentPlanDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.treatmentPlanService.remove(+id);
  }
}
