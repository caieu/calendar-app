import { Add } from '../icons/Add';
import { Link, useSearchParams } from 'react-router-dom';

export const CreateReminderButton = () => {
  const [searchParams] = useSearchParams();
  const date = searchParams.get('date') !== null ? (searchParams.get('date') as string) : '';
  return (
    <Link to={`/create${date ? `?date=${date}` : ''}`}>
      <button
        type="button"
        className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
      >
        <Add className="-ml-1 mr-3 h-5 w-5" aria-hidden="true" />
        Create Reminder
      </button>
    </Link>
  );
};
