import * as React from "react";

interface IAppProps {}

const BackGround: React.FunctionComponent<IAppProps> = (props) => {
  return (
    <svg
      width="70"
      height="70"
      viewBox="0 0 70 70"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className=" fixed  -z-20 top-0 w-screen  h-screen  "
    >
      <path
        className=" stroke-slate-300 "
        d="M29.3656 25.8717C28.6066 25.6928 26.6147 24.9302 26.581 26.4599C26.5425 28.2061 26.1473 30.011 26.4985 31.7667C26.9969 34.2585 27.8043 35.4597 29.7782 36.1645C32.6131 37.1768 35.5797 37.0456 38.0186 34.8679C40.3166 32.8161 42.6869 30.0668 43.0619 26.2994C43.4001 22.9032 41.5565 20.2381 39.6379 18.1721C35.6738 13.9038 30.6449 11.8235 25.694 10.4726C23.632 9.90991 21.5 10.0063 19.5 10.0063C18.5 10.0063 16.2835 10.9946 15.5 12.0101C13.9678 13.996 13.8708 15.0355 12.8537 17.4637C10.1435 23.9345 9.77184 31.3391 10.1 38.5706C10.4392 46.0434 15.4532 52.5818 20.3516 55.7877C27.7043 60.5997 36.0242 60.5051 43.5776 56.6164C46.7474 54.9845 50.2217 53.4834 52.9835 50.815C55.4126 48.4681 57.1921 44.5365 58.7487 41.2173C60.1274 38.2776 59.9967 34.8089 59.9967 31.4592C59.9967 29.53 59.5041 29.7587 58.7487 28.5C58.4037 27.925 57.9399 27.2583 57.769 26.5935"
        stroke="black"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default BackGround;
