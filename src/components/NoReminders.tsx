import { CalendarIcon } from '../icons/Calendar';
import { CreateReminderButton } from './CreateReminderButton';

export const NoReminders = () => {
  return (
    <div className="text-center">
      <CalendarIcon className="mx-auto h-12 w-12 text-gray-400" />
      <h3 className="mt-2 text-sm font-medium text-gray-900">No reminders</h3>
      <p className="mt-1 text-sm text-gray-500">Get started by creating a new reminder.</p>
      <div className="mt-6">
        <CreateReminderButton />
      </div>
    </div>
  );
};
