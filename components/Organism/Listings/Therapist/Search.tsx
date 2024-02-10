import { TherapistResult } from "./therapist.query";
import { Dropdown } from "components/Molecules/Inputs/Dropdown";
import * as React from "react";
import { useQueryStates, queryTypes } from "next-usequerystate";
interface ISearchProps {
  onChange?: () => void;
  data: TherapistResult[];
}

const Search: React.FunctionComponent<ISearchProps> = (props) => {
  const { data } = props;

  const [query, setQuery] = useQueryStates(
    {
      name: queryTypes.string,
      plz: queryTypes.array(queryTypes.string),
      city: queryTypes.string,
    },
    { history: "replace" }
  );

  const plz = React.useMemo(() => {
    let res: string[] = [];
    data.forEach((i) => {
      if (i.zipCode && !res.includes(i.zipCode)) {
        res = [...res, i.zipCode];
      }
    });
    return res.sort();
  }, [data]);

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const fieldName = e.target.name;
    const fieldValue = e.target.value;
    setQuery(
      {
        ...query,
        ...{ [fieldName]: fieldValue ? fieldValue : null },
      },
      { scroll: false, shallow: true }
    );
  };

  return (
    <div className="grid md:grid-cols-2">
      <Dropdown
        items={plz.map((i) => ({ title: i, value: i }))}
        name="PLZ"
        placeHolder="Postleitzahl"
        value={query.plz ? query.plz : undefined}
        onChange={(e) => {
          setQuery(
            //@ts-ignore
            { plz: e.length ? e.map((e) => e.value) : null },
            { scroll: false, shallow: true }
          );
        }}
      />
    </div>
  );
};

export default Search;
