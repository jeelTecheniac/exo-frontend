import React from "react";

const USFlag: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg width="21" height="15" viewBox="0 0 21 15" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <rect width="21" height="15" rx="2" fill="white"/>
      <mask id="mask0_us" style={{maskType: 'alpha'}} maskUnits="userSpaceOnUse" x="0" y="0" width="21" height="15">
        <rect width="21" height="15" rx="2" fill="white"/>
      </mask>
      <g mask="url(#mask0_us)">
        <path fillRule="evenodd" clipRule="evenodd" d="M21 0H0V1.15385H21V0ZM21 2.30769H0V3.46154H21V2.30769ZM0 4.61538H21V5.76923H0V4.61538ZM21 6.92308H0V8.07692H21V6.92308ZM0 9.23077H21V10.3846H0V9.23077ZM21 11.5385H0V12.6923H21V11.5385ZM0 13.8462H21V15H0V13.8462Z" fill="#D02F44"/>
        <rect width="10" height="8.07692" fill="#2D2D92"/>
        <path fillRule="evenodd" clipRule="evenodd" d="M1 1.5L1.4 2.4H2.5L1.55 3L1.95 3.9L1 3.3L0.05 3.9L0.45 3L-0.5 2.4H0.6L1 1.5ZM3 1.5L3.4 2.4H4.5L3.55 3L3.95 3.9L3 3.3L2.05 3.9L2.45 3L1.5 2.4H2.6L3 1.5ZM5.4 2.4H6.5L5.55 3L5.95 3.9L5 3.3L4.05 3.9L4.45 3L3.5 2.4H4.6L5 1.5L5.4 2.4ZM7.4 2.4H8.5L7.55 3L7.95 3.9L7 3.3L6.05 3.9L6.45 3L5.5 2.4H6.6L7 1.5L7.4 2.4ZM9 1.5L9.4 2.4H10.5L9.55 3L9.95 3.9L9 3.3L8.05 3.9L8.45 3L7.5 2.4H8.6L9 1.5ZM1.4 4.9H2.5L1.55 5.5L1.95 6.4L1 5.8L0.05 6.4L0.45 5.5L-0.5 4.9H0.6L1 4L1.4 4.9ZM3.4 4.9H4.5L3.55 5.5L3.95 6.4L3 5.8L2.05 6.4L2.45 5.5L1.5 4.9H2.6L3 4L3.4 4.9ZM5.4 4.9H6.5L5.55 5.5L5.95 6.4L5 5.8L4.05 6.4L4.45 5.5L3.5 4.9H4.6L5 4L5.4 4.9ZM7.4 4.9H8.5L7.55 5.5L7.95 6.4L7 5.8L6.05 6.4L6.45 5.5L5.5 4.9H6.6L7 4L7.4 4.9ZM9 4L9.4 4.9H10.5L9.55 5.5L9.95 6.4L9 5.8L8.05 6.4L8.45 5.5L7.5 4.9H8.6L9 4Z" fill="white"/>
      </g>
    </svg>
  );
};

export default USFlag;