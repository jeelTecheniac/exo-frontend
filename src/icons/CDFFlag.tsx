import React from "react";

const CDFFlag: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg width="21" height="15" viewBox="0 0 21 15" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <rect width="21" height="15" rx="2" fill="#0085C7" />
      <mask id="mask0_cdf" style={{maskType: 'alpha'}} maskUnits="userSpaceOnUse" x="0" y="0" width="21" height="15">
        <rect width="21" height="15" rx="2" fill="white"/>
      </mask>
      <g mask="url(#mask0_cdf)">
        <path fillRule="evenodd" clipRule="evenodd" d="M0 11.25L21 0V3.75L0 15V11.25Z" fill="#E30613" />
        <path d="M4.5 3L5.39 5.75H8.31L5.96 7.5L6.85 10.25L4.5 8.5L2.15 10.25L3.04 7.5L0.69 5.75H3.61L4.5 3Z" fill="#FFDD00" />
      </g>
    </svg>
  );
};

export default CDFFlag;