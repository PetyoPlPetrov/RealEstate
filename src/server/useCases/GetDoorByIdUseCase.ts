import { Door } from '@/models/Door';
import { UseCase } from '@/server/lib/UseCase';
import { DoorMapper } from '@/server/mappers/DoorMapper';
import { ApartmentRepository } from '@/server/repositories/ApartmentRepository';
import { BuildingRepository } from '@/server/repositories/BuildingRepository';
import { DoorRepository } from '@/server/repositories/DoorRepository';
import createHttpError from 'http-errors';
import { injectable } from 'tsyringe';

interface Context {
  doorId: string;
}

@injectable()
export class GetDoorByIdUseCase implements UseCase<Door, Context> {
  constructor(
    private doorRepository: DoorRepository,
    private buildingRepository: BuildingRepository,
    private doorMapper: DoorMapper,
    private apartmentRepository: ApartmentRepository,
  ) {}

  public async execute({ doorId }: Context) {
    const doorDto = await this.doorRepository.getDoorById(doorId);
    let apartmentDto;

    if (!doorDto) {
      throw new createHttpError.NotFound(`no door found for id ${doorId}`);
    }

    const buildingDto = await this.buildingRepository.getBuildingById(
      doorDto.building_id,
    );

    if (!buildingDto) {
      throw new createHttpError.NotFound(
        `no building found for id ${doorDto.building_id}`,
      );
    }

    if (doorDto.apartment_id) {
      apartmentDto = await this.apartmentRepository.getApartmentById(
        doorDto.apartment_id,
      );
    }

    const apartmentDtosById = apartmentDto
      ? {
          [apartmentDto.id]: apartmentDto,
        }
      : undefined;

    const buildingDtosById = {
      [buildingDto.id]: buildingDto,
    };

    return this.doorMapper.toDomain(
      doorDto,
      buildingDtosById,
      apartmentDtosById,
    );
  }
}
