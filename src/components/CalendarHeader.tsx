import { DateTime } from 'luxon';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { selectCurrentDate, setCurrentDate } from '../features/calendar/calendarSlice';
import { Back } from '../icons/Back';
import { Forward } from '../icons/Forward';
import { DATE_FORMAT } from '../utils/Date';

const CALENDAR_TITLE_FORMAT = 'MMMM yyyy';

export const CalendarHeader = () => {
  const dispatch = useAppDispatch();
  const currentDate = DateTime.fromFormat(useAppSelector(selectCurrentDate), DATE_FORMAT);

  const onPrevious = () => {
    const newDate = currentDate.minus({ months: 1 });
    dispatch(setCurrentDate({ date: newDate.toFormat(DATE_FORMAT) }));
  };

  const onNext = () => {
    const newDate = currentDate.plus({ months: 1 });
    dispatch(setCurrentDate({ date: newDate.toFormat(DATE_FORMAT) }));
  };
  return (
    <div>
      <div className="flex flex-row justify-between bg-gray-200">
        <div className="flex p-2">
          <button
            onClick={onPrevious}
            type="button"
            className="inline-flex items-center p-3 border border-transparent rounded-lg shadow-sm text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            <Back className="h-3 w-3" aria-hidden="true" />
          </button>
        </div>
        <div className="flex items-center justify-center">
          <h3 className="text-lg leading-6 font-bold text-gray-900">{currentDate.toFormat(CALENDAR_TITLE_FORMAT)}</h3>
        </div>
        <div className="flex p-2">
          <button
            onClick={onNext}
            type="button"
            className="inline-flex items-center p-3 border border-transparent rounded-lg shadow-sm text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            <Forward className="h-3 w-3" aria-hidden="true" />
          </button>
        </div>
      </div>
      <div className="hidden md:flex justify-around bg-gray-200">
        <div>Sun</div>
        <div>Mon</div>
        <div>Tue</div>
        <div>Wed</div>
        <div>Thu</div>
        <div>Fri</div>
        <div>Sat</div>
      </div>
    </div>
  );
};
