import { IconProps } from '.';

export const Back = ({ className }: IconProps) => {
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
        d="M11.438 18.75L4.688 12l6.75-6.75M5.625 12h13.688"
      ></path>
    </svg>
  );
};
