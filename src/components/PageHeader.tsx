interface PageHeaderProps {
  title: string;
}

export const PageHeader = ({ title }: PageHeaderProps) => {
  return (
    <div className="bg-gray-50">
      <h2 className="py-4 px-4 md:px-0 container mx-auto text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
        {title}
      </h2>
    </div>
  );
};
