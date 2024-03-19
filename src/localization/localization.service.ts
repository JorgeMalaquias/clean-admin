import { Injectable } from '@nestjs/common';
import { LocalizationDTO } from 'src/customer/types/types';
import {
  LocalizationModel,
  LocalizationRepository,
} from './localization.repository';

@Injectable()
export class LocalizationService {
  constructor(
    private readonly localizationRepository: LocalizationRepository,
  ) {}
  async createLocalization(
    data: LocalizationDTO,
    customerId: number,
  ): Promise<void> {
    const localizations =
      await this.localizationRepository.getAllLocalizations();
    const routePosition = calculateRoute(data, localizations);
    await this.localizationRepository.updateLocalization(routePosition);
    await this.localizationRepository.createLocalization({
      ...data,
      customerId,
      routePosition,
    });
  }
}

function calculateRoute(
  newLocalizationToPutOnTheRoute: LocalizationDTO,
  route: LocalizationModel[],
): number {
  let distanceBetweenNeighborsInTheBestPosition: number;
  let partialPosition: number;
  let distanceToNearestPoint: number = Infinity;
  for (let i = 0; i < route.length; i++) {
    const distanceBetweenNewPoinyAndCurrentPoint = distanceBetweenTwoPoints(
      newLocalizationToPutOnTheRoute,
      route[i],
    );
    if (distanceBetweenNewPoinyAndCurrentPoint <= distanceToNearestPoint) {
      distanceToNearestPoint = distanceBetweenNewPoinyAndCurrentPoint;
      let distance: number =
        distanceBetweenTwoPoints(route[i - 1], newLocalizationToPutOnTheRoute) +
        distanceBetweenTwoPoints(newLocalizationToPutOnTheRoute, route[i]) +
        distanceBetweenTwoPoints(route[i], route[i + 1]);
      if (distance < distanceBetweenNeighborsInTheBestPosition) {
        distanceBetweenNeighborsInTheBestPosition = distance;
        partialPosition = route[i].routePosition;
      }
      distance =
        distanceBetweenTwoPoints(route[i - 1], route[i]) +
        distanceBetweenTwoPoints(route[i], newLocalizationToPutOnTheRoute) +
        distanceBetweenTwoPoints(newLocalizationToPutOnTheRoute, route[i + 1]);
      if (distance < distanceBetweenNeighborsInTheBestPosition) {
        distanceBetweenNeighborsInTheBestPosition = distance;
        partialPosition = route[i].routePosition + 1;
      }
    }
  }
  return partialPosition;
}

function distanceBetweenTwoPoints(a: LocalizationDTO, b: LocalizationDTO) {
  return Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2);
}
