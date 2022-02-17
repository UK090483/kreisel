import { useRouter } from "next/router";
import * as React from "react";

interface ISearchProps {}

const Search: React.FunctionComponent<ISearchProps> = (props) => {
  const {} = useRouter();

  return (
    <div className=" flex-col md:flex-row  w-full py-0 md:py-10 flex justify-between ">
      <input
        type="text"
        placeholder="Name"
        className=" rounded-full border-0 text-black placeholder:text-black mb-4 bg-primary-light"
      />

      <input
        type="text"
        placeholder="PlZ"
        pattern="[0-9]{5}"
        className=" rounded-full border-0 text-black placeholder:text-black mb-4 bg-primary-light"
      />

      <input
        type="text"
        placeholder="Stadt"
        className=" rounded-full border-0  text-black placeholder:text-black mb-4 bg-primary-light"
      />
    </div>
  );
};

export default Search;
