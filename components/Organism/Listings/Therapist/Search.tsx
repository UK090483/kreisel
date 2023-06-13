import * as React from "react";
// import { useQueryStates, queryTypes } from "next-usequerystate";
interface ISearchProps {
  onChange?: () => void;
}

const Search: React.FunctionComponent<ISearchProps> = (props) => {
  // const [query, setQuery] = useQueryStates(
  //   {
  //     name: queryTypes.string,
  //     plz: queryTypes.integer,
  //     city: queryTypes.string,
  //   },
  //   { history: "replace" }
  // );

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const fieldName = e.target.name;
    const fieldValue = e.target.value;
    // setQuery(
    //   {
    //     ...query,
    //     ...{ [fieldName]: fieldValue ? fieldValue : null },
    //   },
    //   { scroll: false, shallow: true }
    // );
  };

  return (
    <div className=" flex-col md:flex-row  w-full py-0 md:py-10 flex justify-between ">
      {/* <input
        value={query.name || ""}
        name="name"
        type="text"
        placeholder="Name"
        className=" rounded-full border-0 text-black placeholder:text-black mb-4 bg-primary-light"
        onChange={handleChange}
      />

      <input
        value={query.plz || ""}
        type="text"
        name="plz"
        placeholder="PlZ"
        className=" rounded-full border-0 text-black placeholder:text-black mb-4 bg-primary-light"
        onChange={handleChange}
      />

      <input
        type="text"
        name="city"
        placeholder="Stadt"
        className=" rounded-full border-0  text-black placeholder:text-black mb-4 bg-primary-light"
        onChange={handleChange}
      /> */}
    </div>
  );
};

export default Search;
