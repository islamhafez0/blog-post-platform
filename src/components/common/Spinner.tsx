export const Spinner = ({ classNames }: { classNames: string[] }) => {
  return (
    <span
      className={`border-[3px] border-gray-100 border-b-transparent rounded-full inline-block animate-spin ${classNames.join(
        " "
      )}`}
    ></span>
  );
};
