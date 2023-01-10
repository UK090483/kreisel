import * as React from "react";

interface IPaginationProps {
  page: number;
  itemCount: number;
  onChange: (nextPage: number) => void;
}

const Pagination: React.FunctionComponent<IPaginationProps> = (props) => {
  const { page, itemCount, onChange } = props;

  const chunks = Math.ceil(itemCount / 10);

  const hasNext = page < chunks;
  const hasPrev = page > 1;

  const prev = () => {
    // eslint-disable-next-line no-unused-expressions
    hasPrev && onChange(page - 1);
  };
  const next = () => {
    // eslint-disable-next-line no-unused-expressions
    hasNext && onChange(page + 1);
  };

  return (
    <div className="flex flex-col items-center my-12">
      <div className="flex text-black">
        <button
          onClick={prev}
          className={`h-8 w-8 ml-1 flex justify-center items-center  cursor-pointer ${
            hasPrev ? "opacity-100" : "opacity-40"
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="100%"
            height="100%"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="feather feather-chevron-left w-6 h-6"
          >
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </button>
        <div className="flex h-8 font-medium ">
          {new Array(chunks).fill("a").map((_i, index) => (
            <Item
              onClick={() => onChange(index + 1)}
              active={page === index + 1}
              key={index}
            >
              {index + 1 + ""}
            </Item>
          ))}
        </div>
        <button
          onClick={next}
          className={`h-8 w-8 ml-1 flex justify-center items-center  cursor-pointer ${
            hasNext ? "opacity-100" : "opacity-40"
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="100%"
            height="100%"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="feather feather-chevron-right w-6 h-6                    "
          >
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Pagination;

const Item: React.FC<{
  active: boolean;
  onClick: () => void;
  children?: React.ReactNode;
}> = (props) => {
  const { children, active, onClick } = props;
  return (
    <div
      onClick={onClick}
      className={`w-8 md:flex rounded-full justify-center items-center hidden  cursor-pointer leading-5 transition duration-150 ease-in    ${
        active ? "bg-primary-light" : ""
      }`}
    >
      {children}
    </div>
  );
};
