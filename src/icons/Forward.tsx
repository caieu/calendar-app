import { IconProps } from '.';

export const Forward = ({ className }: IconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="none"
      viewBox="0 0 24 24"
      className={className}
    >
      <path
        stroke="#fff"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2.25"
        d="M12.562 5.25l6.75 6.75-6.75 6.75M18.375 12H4.687"
      ></path>
    </svg>
  );
};
