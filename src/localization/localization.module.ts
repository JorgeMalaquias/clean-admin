import { Module } from '@nestjs/common';
import { LocalizationController } from './localization.controller';
import { LocalizationRepository } from './localization.repository';
import { LocalizationService } from './localization.service';

@Module({
  imports: [],
  controllers: [LocalizationController],
  providers: [LocalizationService, LocalizationRepository],
})
export class LocalizationModule {}
