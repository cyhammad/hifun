import React from "react";

export const ChatIcon = (props) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M8.5 19H8C4 19 2 18 2 13V8C2 4 4 2 8 2H16C20 2 22 4 22 8V13C22 17 20 19 16 19H15.5L12 22L8.5 19Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M7 8H17"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M7 13H13"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const SendIcon = (props) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g clipPath="url(#sendClip)">
      <path
        d="M5.02453 12.0599L4.4174 6.5957C4.24361 5.03162 5.85334 3.88354 7.27556 4.55722L19.2797 10.2434C20.8124 10.9694 20.8124 13.1504 19.2797 13.8764L7.27556 19.5626C5.85334 20.2362 4.24361 19.0882 4.4174 17.5241L5.02453 12.0599ZM5.02453 12.0599H12.0595"
        stroke="currentColor"
        strokeWidth="1.71429"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
    <defs>
      <clipPath id="sendClip">
        <rect width="24" height="24" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

export const GalleryIcon = (props) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M3.00005 16.9998C3 16.9353 3 16.8687 3 16.8V7.19995C3 6.07985 3 5.51938 3.21799 5.09155C3.40973 4.71523 3.71547 4.40949 4.0918 4.21774C4.51962 3.99976 5.08009 3.99976 6.2002 3.99976H17.8002C18.9203 3.99976 19.4801 3.99976 19.9079 4.21774C20.2842 4.40949 20.5905 4.71523 20.7822 5.09155C21 5.51896 21 6.07875 21 7.19667V16.8028C21 17.2879 21 17.6677 20.9822 17.9772M3.00005 16.9998C3.00082 17.9882 3.01337 18.5056 3.21799 18.9072C3.40973 19.2835 3.71547 19.5902 4.0918 19.782C20.2842 19.5902 20.5905 19.2835 20.7822 18.9072C20.9055 18.6652 20.959 18.381 20.9822 17.9772M3.00005 16.9998L7.76798 11.4373L7.76939 11.4357C8.19227 10.9424 8.40406 10.6953 8.65527 10.6062C8.87594 10.528 9.11687 10.5298 9.33643 10.6111C9.58664 10.7037 9.79506 10.9536 10.2119 11.4539L12.8831 14.6593C13.269 15.1223 13.463 15.3552 13.6986 15.4486C13.9065 15.5311 14.1357 15.5404 14.3501 15.4771C14.5942 15.405 14.8091 15.1902 15.2388 14.7605L15.7358 14.2634C16.1733 13.8259 16.3921 13.6073 16.6397 13.5359C16.8571 13.4731 17.0896 13.4866 17.2988 13.573C17.537 13.6714 17.7302 13.9121 18.1167 14.3953L20.9822 17.9772M20.9822 17.9772L21 17.9994M15 9.99976C14.4477 9.99976 14 9.55204 14 8.99976C14 8.44747 14.4477 7.99976 15 7.99976C15.5523 7.99976 16 8.44747 16 8.99976C16 9.55204 15.5523 9.99976 15 9.99976Z"
      stroke="currentColor"
      strokeWidth="1.71429"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const DoubleCheckIcon = (props) => (
  <svg
    width="15"
    height="15"
    viewBox="0 0 15 15"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M4.89667 7.64407L7.49421 10.2416L12.6887 5.04651M1.83545 7.64407L4.43299 10.2416M9.62806 5.04651L7.65178 7.04084"
      stroke="#582BB3"
      strokeWidth="1.22449"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
