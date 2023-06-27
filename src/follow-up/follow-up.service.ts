import { Injectable } from '@nestjs/common';
import { CreateFollowUpDto } from './dto/create-follow-up.dto';
import { UpdateFollowUpDto } from './dto/update-follow-up.dto';

@Injectable()
export class FollowUpService {
  create(createFollowUpDto: CreateFollowUpDto) {
    return 'This action adds a new followUp';
  }

  findAll() {
    return `This action returns all followUp`;
  }

  findOne(id: number) {
    return `This action returns a #${id} followUp`;
  }

  update(id: number, updateFollowUpDto: UpdateFollowUpDto) {
    return `This action updates a #${id} followUp`;
  }

  remove(id: number) {
    return `This action removes a #${id} followUp`;
  }
}
