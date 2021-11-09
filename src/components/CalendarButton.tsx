import { CalendarOutlineIcon } from '../icons/CalendarOutline';
import { Link } from 'react-router-dom';

export const CalendarButton = () => {
  return (
    <Link to="/">
      <button
        type="button"
        title="Back to calendar"
        className="inline-flex items-center p-2 ml-2 border border-transparent rounded-md shadow-sm text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
      >
        <CalendarOutlineIcon className="h-5 w-5" aria-hidden="true" color="white" />
      </button>
    </Link>
  );
};
