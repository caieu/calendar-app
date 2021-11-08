import { AppHeader } from '../components/AppHeader';
import { Calendar } from '../components/Calendar';

export const Home = () => {
  return (
    <div className="flex flex-col flex-1">
      <AppHeader />
      <Calendar />
    </div>
  );
};
