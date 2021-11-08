import { CreateReminderForm } from '../components/CreateReminderForm';
import { PageContainer } from '../components/PageContainer';

export const CreateReminder = () => {
  return (
    <PageContainer headerTitle="Create a reminder">
      <CreateReminderForm />
    </PageContainer>
  );
};
