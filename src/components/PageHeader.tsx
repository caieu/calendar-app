import { CalendarButton } from './CalendarButton';

interface PageHeaderProps {
  title: string;
}

export const PageHeader = ({ title }: PageHeaderProps) => {
  return (
    <div className="bg-gray-50">
      <div className="py-4 px-4 md:px-0 container mx-auto flex">
        <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate self-center">{title}</h2>
        <CalendarButton />
      </div>
    </div>
  );
};
