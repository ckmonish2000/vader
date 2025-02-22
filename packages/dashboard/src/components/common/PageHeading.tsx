interface PageHeadingProps {
  title: string;
}

const PageHeading: React.FC<PageHeadingProps> = ({ title }) => {
  return (
    <div className="flex items-center justify-between space-y-2 mb-6">
      <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
    </div>
  );
};

export default PageHeading;
