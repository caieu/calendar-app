import classNames from 'classnames';
import { Formik } from 'formik';
import { DateTime } from 'luxon';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { deleteReminder, editReminder, selectReminders } from '../features/calendar/calendarSlice';
import { DATE_FORMAT, DATE_TIME_FORMAT } from '../utils/Date';
import { ColorPicker } from './ColorPicker';

const EditReminderSchema = Yup.object().shape({
  text: Yup.string().max(30, 'Too Long!').required('Required'),
  color: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Required'),
  datetime: Yup.date().required('Required'),
});

interface EditReminderFormProps {
  reminderId: string;
}

interface EditReminderFormValues {
  text: string;
  color: string;
  datetime: string;
}

export const EditReminderForm = ({ reminderId }: EditReminderFormProps) => {
  const reminders = useAppSelector(selectReminders);
  const reminder = reminders[reminderId];
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const onSubmit = (values: EditReminderFormValues) => {
    const date = DateTime.fromISO(values.datetime).toFormat(DATE_FORMAT);
    dispatch(
      editReminder({
        reminder: {
          id: reminderId,
          text: values.text,
          color: values.color,
          date: DateTime.fromISO(values.datetime).toFormat(DATE_TIME_FORMAT),
        },
      }),
    );
    navigate(`/detail?date=${date}`);
  };

  const onCancel = () => {
    navigate(-1);
  };

  const onDelete = () => {
    dispatch(deleteReminder({ id: reminderId }));
    navigate(`/detail?date=${DateTime.fromFormat(reminder.date, DATE_TIME_FORMAT).toFormat(DATE_FORMAT)}`);
  };

  if (!reminder) return null;

  const { text, color, date } = reminder;

  return (
    <Formik
      initialValues={{
        text,
        color,
        datetime: DateTime.fromFormat(date, DATE_TIME_FORMAT).toISO({
          suppressMilliseconds: true,
          suppressSeconds: true,
          includeOffset: false,
        }),
      }}
      validationSchema={EditReminderSchema}
      onSubmit={onSubmit}
    >
      {({ values, errors, touched, handleChange, handleBlur, handleSubmit, setFieldValue }) => (
        <div>
          <form onSubmit={handleSubmit} className="space-y-8 divide-y divide-gray-200">
            <div className="space-y-8 divide-gray-200 sm:space-y-5">
              <div>
                <div className="mt-6 sm:mt-5 space-y-6 sm:space-y-5">
                  <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start">
                    <label htmlFor="first-name" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                      Reminder text
                    </label>
                    <div className="mt-1 sm:mt-0 sm:col-span-2">
                      <textarea
                        id="text"
                        name="text"
                        rows={3}
                        maxLength={30}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.text}
                        className={classNames(
                          'max-w-lg shadow-sm block w-full sm:text-sm border border-gray-300 rounded-md',
                          errors.text && touched.text && 'ring-2 ring-red-500 border-red-500',
                          !errors.text && touched.text && 'focus:ring-gray-500 focus:border-gray-500',
                        )}
                      />
                      <p
                        className={classNames(
                          'mt-2 text-sm ',
                          errors.text && touched.text ? 'text-red-500' : 'text-gray-500',
                        )}
                      >
                        {errors.text && touched.text ? errors.text : 'Write what you want to remind.'}
                      </p>
                    </div>
                  </div>
                  <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                    <label htmlFor="datetime" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                      Date / Time
                    </label>
                    <div className="mt-1">
                      <input
                        type="datetime-local"
                        name="datetime"
                        id="datetime"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.datetime}
                        className="shadow-sm focus:ring-gray-500 focus:border-gray-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      />
                      {errors.datetime && touched.datetime && (
                        <p className={classNames('mt-2 text-sm ', errors.text ? 'text-red-500' : 'text-gray-500')}>
                          {errors.text}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-center sm:border-t sm:border-gray-200 sm:pt-5">
                    <label htmlFor="photo" className="block text-sm font-medium text-gray-700">
                      Color
                    </label>
                    <div className="mt-1 sm:mt-0 sm:col-span-2">
                      <div className="flex items-center">
                        <ColorPicker initialColor={color} onSelectColor={(color) => setFieldValue('color', color)} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="pt-4 flex flex-row">
              <div className="flex flex-row">
                <button
                  onClick={onDelete}
                  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  Delete
                </button>
              </div>
              <div className="flex flex-1 justify-end">
                <button
                  onClick={onCancel}
                  type="button"
                  className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                >
                  Edit
                </button>
              </div>
            </div>
          </form>
        </div>
      )}
    </Formik>
  );
};
