import { IconProps } from ".";

export const Add = ({className}: IconProps) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" className={className}>
      <path
        stroke="#fff"
        strokeLinecap="square"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M12 5.25v13.5M18.75 12H5.25"
      ></path>
    </svg>
  );
};
