import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { FollowUpService } from './follow-up.service';
import { CreateFollowUpDto } from './dto/create-follow-up.dto';
import { UpdateFollowUpDto } from './dto/update-follow-up.dto';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('Registro y seguimiento')
@Controller('follow-up')
export class FollowUpController {
  constructor(private readonly followUpService: FollowUpService) {}

  @Post()
  create(@Body() createFollowUpDto: CreateFollowUpDto) {
    return this.followUpService.create(createFollowUpDto);
  }

  @Get()
  findAll() {
    return this.followUpService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.followUpService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateFollowUpDto: UpdateFollowUpDto,
  ) {
    return this.followUpService.update(+id, updateFollowUpDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.followUpService.remove(+id);
  }
}
