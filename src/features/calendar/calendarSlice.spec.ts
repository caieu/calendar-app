import { DateTime } from 'luxon';
import { v4 as uuidv4 } from 'uuid';
import { DATE_FORMAT, DATE_TIME_FORMAT } from '../../utils/Date';
import calendarReducer, {
  createReminder,
  deleteReminder,
  editReminder,
  initialState,
  setCurrentDate,
} from './calendarSlice';

describe('calendar reducer', () => {
  it('should handle initial state', () => {
    expect(calendarReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('should set current date', () => {
    const currentDate = DateTime.now();
    const actual = calendarReducer(initialState, setCurrentDate({ date: currentDate.toFormat(DATE_FORMAT) }));
    expect(actual.currentDate).toEqual(currentDate.toFormat(DATE_FORMAT));
  });

  it('should create a reminder', () => {
    const dateTime = DateTime.now();
    const reminder = {
      color: '',
      date: dateTime.toFormat(DATE_TIME_FORMAT),
      id: uuidv4(),
      text: 'Reminder Test',
    };
    const actual = calendarReducer(
      initialState,
      createReminder({
        date: dateTime.toFormat(DATE_FORMAT),
        reminder,
      }),
    );
    expect(actual.dates[dateTime.toFormat(DATE_FORMAT)]).toEqual([reminder.id]);
    expect(actual.reminders[reminder.id]).toEqual(reminder);
  });

  it('should delete a reminder', () => {
    const dateTime = DateTime.now();
    const reminder = {
      color: 'bg-yellow-200',
      date: dateTime.toFormat(DATE_TIME_FORMAT),
      id: uuidv4(),
      text: 'Reminder Test',
    };
    let actual = calendarReducer(
      initialState,
      createReminder({
        date: dateTime.toFormat(DATE_FORMAT),
        reminder,
      }),
    );
    expect(actual.dates[dateTime.toFormat(DATE_FORMAT)]).toEqual([reminder.id]);
    expect(actual.reminders[reminder.id]).toEqual(reminder);
    actual = calendarReducer(
      actual,
      deleteReminder({
        id: reminder.id,
      }),
    );
    expect(actual.dates[dateTime.toFormat(DATE_FORMAT)]).toEqual([]);
    expect(actual.reminders[reminder.id]).toBeUndefined();
  });

  it('should edit a reminder', () => {
    const dateTime = DateTime.now();
    const reminder = {
      color: 'bg-yellow-200',
      date: dateTime.toFormat(DATE_TIME_FORMAT),
      id: uuidv4(),
      text: 'Reminder Test',
    };
    let actual = calendarReducer(
      initialState,
      createReminder({
        date: dateTime.toFormat(DATE_FORMAT),
        reminder,
      }),
    );
    expect(actual.dates[dateTime.toFormat(DATE_FORMAT)]).toEqual([reminder.id]);
    expect(actual.reminders[reminder.id]).toEqual(reminder);
    actual = calendarReducer(
      actual,
      editReminder({
        reminder: {
          color: 'bg-blue-200',
          date: dateTime.plus({ days: 1 }).toFormat(DATE_FORMAT),
          text: 'Edited Reminder Test',
          id: reminder.id,
        },
      }),
    );
    expect(actual.dates[dateTime.toFormat(DATE_FORMAT)]).toEqual([reminder.id]);
    expect(actual.reminders[reminder.id].text).toEqual('Edited Reminder Test');
    expect(actual.reminders[reminder.id].color).toEqual('bg-blue-200');
    expect(actual.reminders[reminder.id].date).toEqual(dateTime.plus({ days: 1 }).toFormat(DATE_FORMAT));
  });
});
