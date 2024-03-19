import { Controller, Get } from '@nestjs/common';
import { LocalizationService } from './localization.service';

@Controller('/localizations')
export class LocalizationController {
  constructor(private readonly localizationService: LocalizationService) {}
  @Get()
  async getRouteOrder(): Promise<any> {
    return this.localizationService.getRouteOrder();
  }
}
