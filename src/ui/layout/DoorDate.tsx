import { DateTime, getLocaleString } from '@/lib/dateTime';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';

interface DooreDateProps {
  date: Date | string | null;
}

export function DoorDate({ date }: DooreDateProps) {
  const [currentDate, setCurrentDate] = useState<string | undefined>();

  /**
   * making sure that current date calculation is only executed on client side
   */
  useEffect(() => {
    setCurrentDate(getLocaleString(date, DateTime.DATETIME_SHORT_WITH_SECONDS));
  }, [date]);

  return <Typography>{currentDate}</Typography>;
}
