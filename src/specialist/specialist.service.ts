import { Injectable } from '@nestjs/common';
import { CreateSpecialistDto } from './dto/create-specialist.dto';
import { UpdateSpecialistDto } from './dto/update-specialist.dto';

@Injectable()
export class SpecialistService {
  create(createSpecialistDto: CreateSpecialistDto) {
    return 'This action adds a new specialist';
  }

  findAll() {
    return `This action returns all specialist`;
  }

  findOne(id: number) {
    return `This action returns a #${id} specialist`;
  }

  update(id: number, updateSpecialistDto: UpdateSpecialistDto) {
    return `This action updates a #${id} specialist`;
  }

  remove(id: number) {
    return `This action removes a #${id} specialist`;
  }
}
