import { Link } from 'react-router-dom';
import { CalendarIcon } from '../icons/Calendar';

export const AppHeader = () => {
  return (
    <Link to="/">
      <div className="flex w-full bg-gray-700 px-4 md:px-10 py-6 items-center space-x-4">
        <div className="flex container mx-auto">
          <CalendarIcon color="white" />
          <div className="text-white font-bold pl-2">Calendar App</div>
        </div>
      </div>
    </Link>
  );
};
