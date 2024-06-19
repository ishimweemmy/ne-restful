function Card(props: {
  variant?: string;
  extra?: string;
  children?: JSX.Element | any[];
  [x: string]: any;
}) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { variant, extra, children, ...rest } = props;
  return (
    <div
      className={`relative flex flex-col rounded-[10px] bg-white bg-clip-border shadow-2xl shadow-shadow-500 dark:!bg-navy-800 dark:text-white dark:shadow-none ${extra}`}
      {...rest}
    >
      {children}
    </div>
  );
}

export default Card;
