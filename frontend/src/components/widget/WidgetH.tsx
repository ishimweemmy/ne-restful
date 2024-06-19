import Card from "src/components/card";

const WidgetH = (props: {
  icon: JSX.Element;
  name: string;
  someProducts: string[];
  extra?: string;
  earns: string;
}) => {
  const { icon, name, someProducts, extra, earns } = props;
  return (
    <Card extra="!flex-row items-center justify-between rounded-[20px] !shadow-none py-2">
      <div className="flex gap-2">
        <div className="flex w-auto flex-row items-center cursor-pointer">
          <div
            className={`rounded-md bg-lightPrimary p-3 dark:bg-navy-700 ${extra}`}
          >
            <span className="flex items-center text-brand-500 dark:text-white">
              {icon}
            </span>
          </div>
        </div>

        <div className="ml-4 flex w-auto flex-col justify-center">
          <h4 className="text-base font-semibold text-navy-600 dark:text-white">
            {name}
          </h4>
          <p className="font-dm text-sm font-medium text-gray-600">
            {someProducts.slice(0, 3).join(", ")}...
          </p>
        </div>
      </div>
      <span className="font-semibold text-navy-600">{earns}</span>
    </Card>
  );
};

export default WidgetH;
