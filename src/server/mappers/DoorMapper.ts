import { ApartmentDto } from '@/__mocks__/dtos/ApartmentDto';
import { BuildingDto } from '@/__mocks__/dtos/BuidlingDto';
import { DoorDto } from '@/__mocks__/dtos/DoorDto';
import { Door } from '@/models/Door';
import { EntityMapper } from '@/server/lib/EntityMapper';
import { injectable } from 'tsyringe';

type BuildingDtosById = Record<string, BuildingDto>;
type ApartDtosById = Record<string, ApartmentDto>;

@injectable()
export class DoorMapper implements EntityMapper<Door, DoorDto> {
  public toDomain(
    doorDto: DoorDto,
    buildingDtosById: BuildingDtosById,
    apartmentDtosById?: ApartDtosById,
  ): Door {
    const buildingName = this.getBuildingName(
      buildingDtosById,
      doorDto.building_id,
    );

    const apartmentName = this.getApartmentName(
      apartmentDtosById,
      doorDto.apartment_id,
    );

    return {
      id: doorDto.id,
      name: doorDto.name,
      buildingName,
      apartmentName,
      connectionType: doorDto.connection_type,
      connectionStatus: doorDto.connection_status,
      lastConnectionStatusUpdate: doorDto.last_connection_status_update,
    };
  }

  private getBuildingName(buildingDtos: BuildingDtosById, id: string) {
    const building = buildingDtos[id];

    return building ? `${building.street} ${building.street_no}` : 'n/a';
  }

  private getApartmentName(
    apartDtos: ApartDtosById | undefined,
    id: string | undefined,
  ) {
    if (apartDtos == undefined || !id) {
      return 'n/a';
    }

    const apart = apartDtos[id];

    return apart ? `${apart.name}` : 'n/a';
  }
}
