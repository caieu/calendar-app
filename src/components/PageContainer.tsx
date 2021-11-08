import { ReactChild } from 'react';
import { AppHeader } from './AppHeader';
import { PageHeader } from './PageHeader';

interface PageContainerProps {
  children: ReactChild;
  headerTitle?: string;
}

export const PageContainer = ({ children, headerTitle }: PageContainerProps) => {
  return (
    <div>
      <AppHeader />
      {headerTitle && <PageHeader title={headerTitle} />}
      <div className="container mx-auto px-4 md:px-0 py-4 space-y-4">{children}</div>
    </div>
  );
};
