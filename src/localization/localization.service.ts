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
    const routePosition: number = calculateRoute(data, localizations);
    await this.localizationRepository.updateLocalization(routePosition);
    await this.localizationRepository.createLocalization({
      ...data,
      customerId,
      routePosition,
    });
  }
  async getRouteOrder(): Promise<LocalizationModel[]> {
    return await this.localizationRepository.getLocalizationsOrderedByThePositionORoute();
  }
}

function calculateRoute(
  newLocalizationToPutOnTheRoute: LocalizationDTO,
  route: LocalizationModel[],
): number {
  let distanceBetweenNeighborsInTheBestPosition: number = Infinity;
  let partialPosition: number = 1;
  let distanceToNearestPoint: number = Infinity;
  for (let i = 2; i < route.length; i++) {
    const distanceBetweenNewPointAndCurrentPoint = distanceBetweenTwoPoints(
      newLocalizationToPutOnTheRoute,
      route[i],
    );
    if (distanceBetweenNewPointAndCurrentPoint <= distanceToNearestPoint) {
      distanceToNearestPoint = distanceBetweenNewPointAndCurrentPoint;
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
  if (!a) {
    return Math.sqrt((0 - b.x) ** 2 + (0 - b.y) ** 2);
  }
  if (!b) {
    return Math.sqrt((a.x - 0) ** 2 + (a.y - 0) ** 2);
  }
  return Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2);
}
