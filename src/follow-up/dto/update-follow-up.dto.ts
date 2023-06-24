import { PartialType } from '@nestjs/swagger';
import { CreateFollowUpDto } from './create-follow-up.dto';

export class UpdateFollowUpDto extends PartialType(CreateFollowUpDto) {}
