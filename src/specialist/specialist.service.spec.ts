import { Test, TestingModule } from '@nestjs/testing';
import { SpecialistService } from './specialist.service';

describe('SpecialistService', () => {
  let service: SpecialistService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SpecialistService],
    }).compile();

    service = module.get<SpecialistService>(SpecialistService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
