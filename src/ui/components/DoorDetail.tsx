import Typography from '@mui/material/Typography';
import { Door } from '@/models/Door';
import { DetailPageContainer } from '@/ui/layout/DetailPageContainer';
import { DetailPageItem } from '@/ui/layout/DetailPageItem';
import { DoorDate } from '@/ui/layout/DoorDate';

interface DoorDetailProps {
  door: Door;
}

export function DoorDetail({ door }: DoorDetailProps) {
  return (
    <DetailPageContainer>
      <DetailPageItem label="ID">
        <Typography>{door.id}</Typography>
      </DetailPageItem>
      <DetailPageItem label="Building">
        <Typography>{door.buildingName}</Typography>
      </DetailPageItem>
      <DetailPageItem label="Apartment">
        <Typography>{door.apartmentName}</Typography>
      </DetailPageItem>
      <DetailPageItem label="Connection type">
        <Typography>{door.connectionType}</Typography>
      </DetailPageItem>
      <DetailPageItem label="Last Connection">
        <DoorDate date={door.lastConnectionStatusUpdate} />
      </DetailPageItem>
      <DetailPageItem label="Connection status">
        <Typography color="success.main">{door.connectionStatus}</Typography>
      </DetailPageItem>
    </DetailPageContainer>
  );
}
