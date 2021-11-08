import { IconProps } from ".";

export const Star = ({ outline }: IconProps) => {
  return (
    <>
      {outline ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
          viewBox="0 0 24 24"
        >
          <g clipPath="url(#clip0_27:4598)">
            <path
              stroke="#000"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M22.5 9.749h-8.063L12 2.249l-2.438 7.5H1.5l6.562 4.5-2.53 7.5L12 17.061l6.469 4.688-2.532-7.5 6.563-4.5z"
            ></path>
          </g>
          <defs>
            <clipPath id="clip0_27:4598">
              <path
                fill="#fff"
                d="M0 0H24V24H0z"
                transform="translate(0 -.001)"
              ></path>
            </clipPath>
          </defs>
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
          viewBox="0 0 24 24"
        >
          <g clipPath="url(#clip0_27:4597)">
            <path
              fill="#000"
              d="M23.25 9.53h-8.608L12 1.5 9.358 9.53H.75l7.041 4.94L5.05 22.5 12 17.523l6.951 4.977-2.747-8.03 7.046-4.94z"
            ></path>
          </g>
          <defs>
            <clipPath id="clip0_27:4597">
              <path fill="#fff" d="M0 0H24V24H0z"></path>
            </clipPath>
          </defs>
        </svg>
      )}
    </>
  );
};
