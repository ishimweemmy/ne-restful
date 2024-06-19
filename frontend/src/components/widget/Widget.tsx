import Card from "src/components/card";

const Widget = (props: {
  icon: JSX.Element;
  title: string;
  subtitle: string;
  extra?: string;
}) => {
  const { icon, title, subtitle, extra } = props;
  return (
    <Card extra="!flex-row flex-grow items-center rounded-[20px]">
      <div className="flex h-[90px] w-auto flex-row items-center cursor-pointer">
        <div
          className={`rounded-full bg-lightPrimary p-3 dark:bg-navy-700 ${extra}`}
        >
          <span className="flex items-center text-brand-500 dark:text-white">
            {icon}
          </span>
        </div>
      </div>

      <div className="h-50 ml-4 flex w-auto flex-col justify-center">
        <h4 className="text-lg font-bold text-navy-700 dark:text-white">
          {subtitle}
        </h4>
        <p className="font-dm text-xs font-medium text-gray-600">{title}</p>
      </div>
    </Card>
  );
};

export default Widget;
