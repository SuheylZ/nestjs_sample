import { Test, TestingModule } from '@nestjs/testing';
import { LangagesController } from './language.controller';
import { LanguageService } from './language.service';

describe('CountryController', () => {
  let controller: LangagesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LangagesController],
      providers: [LanguageService],
    }).compile();

    controller = module.get<LangagesController>(LangagesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
