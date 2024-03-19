import { Controller } from '@nestjs/common';
import { LocalizationService } from './localization.service';

@Controller('/localizations')
export class LocalizationController {
  constructor(private readonly localizationService: LocalizationService) {}
}
