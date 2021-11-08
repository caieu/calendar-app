import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DateTime } from 'luxon';
import { RootState } from '../../app/store';
import { DATE_FORMAT, DATE_TIME_FORMAT } from '../../utils/Date';

export type Reminder = {
  id: string;
  text: string;
  color: string;
  date: string;
};

export interface CalendarState {
  dates: { [date: string]: string[] };
  reminders: { [id: string]: Reminder };
  currentDate: string;
}

export interface CreateReminderPayload {
  date: string;
  reminder: Reminder;
}

export interface DeleteReminderPayload {
  id: string;
}

export interface EditReminderPayload {
  reminder: Reminder;
}

export interface SetCurrentDatePayload {
  date: string;
}

export const initialState: CalendarState = {
  dates: {},
  reminders: {},
  currentDate: DateTime.now().toFormat(DATE_FORMAT),
};

export const calendarSlice = createSlice({
  name: 'calendar',
  initialState,
  reducers: {
    createReminder: (state, action: PayloadAction<CreateReminderPayload>) => {
      state.dates = {
        ...state.dates,
        [action.payload.date]: state.dates[action.payload.date]
          ? [...state.dates[action.payload.date], action.payload.reminder.id]
          : [action.payload.reminder.id],
      };
      state.reminders = {
        ...state.reminders,
        [action.payload.reminder.id]: action.payload.reminder,
      };
      state.dates[action.payload.date] = state.dates[action.payload.date].sort(
        (a, b) =>
          DateTime.fromFormat(state.reminders[a].date, DATE_TIME_FORMAT).toMillis() -
          DateTime.fromFormat(state.reminders[b].date, DATE_TIME_FORMAT).toMillis(),
      );
      return state;
    },
    deleteReminder: (state, action: PayloadAction<DeleteReminderPayload>) => {
      const reminder = state.reminders[action.payload.id];
      if (!reminder) return;
      delete state.reminders[reminder.id];
      let filteredRemindersIds = state.dates[
        DateTime.fromFormat(reminder.date, DATE_TIME_FORMAT).toFormat(DATE_FORMAT)
      ].filter((reminderId) => reminderId !== reminder.id);
      state.dates = {
        ...state.dates,
        [DateTime.fromFormat(reminder.date, DATE_TIME_FORMAT).toFormat(DATE_FORMAT)]: filteredRemindersIds,
      };
    },
    editReminder: (state, action: PayloadAction<EditReminderPayload>) => {
      state.reminders[action.payload.reminder.id] = action.payload.reminder;
    },
    setCurrentDate: (state, action: PayloadAction<SetCurrentDatePayload>) => {
      state.currentDate = action.payload.date;
    },
  },
});

export const { createReminder, deleteReminder, editReminder, setCurrentDate } = calendarSlice.actions;

export const selectDates = (state: RootState) => state.calendar.dates;
export const selectReminders = (state: RootState) => state.calendar.reminders;
export const selectCurrentDate = (state: RootState) => state.calendar.currentDate;

export default calendarSlice.reducer;
