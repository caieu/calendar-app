import classNames from 'classnames';
import { Formik } from 'formik';
import { DateTime } from 'luxon';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import * as Yup from 'yup';
import { useAppDispatch } from '../app/hooks';
import { createReminder } from '../features/calendar/calendarSlice';
import { DATE_FORMAT, DATE_TIME_FORMAT } from '../utils/Date';
import { ColorPicker, DEFAULT_PICKER_COLOR } from './ColorPicker';

const CreateReminderSchema = Yup.object().shape({
  text: Yup.string().max(30, 'Too Long!').required('Required'),
  color: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Required'),
  datetime: Yup.date().required('Required'),
});

interface CreateReminderFormValues {
  text: string;
  color: string;
  datetime: string;
}

export const CreateReminderForm = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const onSubmit = (values: CreateReminderFormValues) => {
    const date = DateTime.fromISO(values.datetime).toFormat(DATE_FORMAT);
    dispatch(
      createReminder({
        reminder: {
          text: values.text,
          color: values.color,
          id: uuidv4(),
          date: DateTime.fromISO(values.datetime).toFormat(DATE_TIME_FORMAT),
        },
        date,
      }),
    );
    navigate(`/detail?date=${date}`);
  };

  const onCancel = () => {
    navigate(-1);
  };

  return (
    <Formik
      initialValues={{
        text: '',
        color: DEFAULT_PICKER_COLOR,
        datetime:
          searchParams.get('date') !== null
            ? DateTime.fromFormat(searchParams.get('date') as string, DATE_FORMAT)
                .set({ hour: 8, second: 0, millisecond: 0 })
                .toISO({ suppressMilliseconds: true, suppressSeconds: true, includeOffset: false })
            : DateTime.now()
                .plus({ hours: 2 })
                .set({ second: 0, millisecond: 0 })
                .toISO({ suppressMilliseconds: true, suppressSeconds: true, includeOffset: false }),
      }}
      validationSchema={CreateReminderSchema}
      onSubmit={onSubmit}
    >
      {({ values, errors, touched, handleChange, handleBlur, handleSubmit, setFieldValue }) => (
        <div>
          <form onSubmit={handleSubmit} className="space-y-8 divide-y divide-gray-200">
            <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
              <div>
                <div>
                  <h3 className="text-lg leading-6 font-medium text-gray-900">New Reminder</h3>
                  <p className="mt-1 max-w-2xl text-sm text-gray-500">
                    Add the information that will be shown at the calendar.
                  </p>
                </div>
                <div className="mt-6 sm:mt-5 space-y-6 sm:space-y-5">
                  <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
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
                        <ColorPicker onSelectColor={(color) => setFieldValue('color', color)} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="pt-4">
              <div className="flex justify-end">
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
                  Create
                </button>
              </div>
            </div>
          </form>
        </div>
      )}
    </Formik>
  );
};
