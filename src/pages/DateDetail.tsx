import { DateTime } from 'luxon';
import { useSearchParams } from 'react-router-dom';
import { useAppSelector } from '../app/hooks';
import { CreateReminderButton } from '../components/CreateReminderButton';
import { NoReminders } from '../components/NoReminders';
import { PageContainer } from '../components/PageContainer';
import { ReminderCard } from '../components/ReminderCard';
import { selectDates } from '../features/calendar/calendarSlice';
import { DATE_FORMAT } from '../utils/Date';

export const DateDetail = () => {
  const [searchParams] = useSearchParams();
  const dates = useAppSelector(selectDates);
  const date =
    searchParams.get('date') !== null ? (searchParams.get('date') as string) : DateTime.now().toFormat(DATE_FORMAT);

  return (
    <PageContainer headerTitle={DateTime.fromFormat(date, DATE_FORMAT).toLocaleString(DateTime.DATE_MED)}>
      <>
        {dates[date] && dates[date].length > 0 && (
          <>
            <CreateReminderButton />
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-1 cursor-pointer">
              {dates[date].map((reminderId) => (
                <ReminderCard key={reminderId} reminderId={reminderId} detail />
              ))}
            </div>
          </>
        )}
        {(!dates[date] || dates[date].length === 0) && (
          <div className="p-10">
            <NoReminders />
          </div>
        )}
      </>
    </PageContainer>
  );
};
