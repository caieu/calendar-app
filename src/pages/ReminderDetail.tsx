import { useSearchParams } from 'react-router-dom';
import { EditReminderForm } from '../components/EditReminderForm';
import { NotFound } from '../components/NotFound';
import { PageContainer } from '../components/PageContainer';

export const ReminderDetail = () => {
  const [searchParams] = useSearchParams();
  const reminderId = searchParams.get('id') !== null ? (searchParams.get('id') as string) : '';
  return (
    <PageContainer headerTitle="Edit reminder">
      <>
        {reminderId ? (
          <EditReminderForm reminderId={reminderId} />
        ) : (
          <NotFound
            title="Reminder not found"
            description="We couldn't find the reminder. Please, get back to the calendar and try again."
          />
        )}
      </>
    </PageContainer>
  );
};
