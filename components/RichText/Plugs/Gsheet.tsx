import Button from "@components/Button/Button";
import List from "@components/List/List";
import ListItem from "@components/List/ListItem";
import Typo from "@components/Typography/Typography";
import useCSV, { DataResult } from "@hooks/useCsv";
import { PlugProps } from "@privateModules/SanityPageBuilder/lib/RichText";
import { filter } from "lodash";
import * as React from "react";

interface IGSheetItem {
  columnName?: string | null;
}

interface IGSheetProps {
  url?: string | null;
  columns?: IGSheetItem[];
}

const GSheet: React.FunctionComponent<PlugProps<IGSheetProps>> = (props) => {
  const url = props?.node?.url;
  const { node } = props;
  const { columns } = node;

  const csv = useCSV({ hot: true, url });

  const downloadLink = url && url?.replace("csv", "pdf");

  const { data, loading, reload } = csv;

  const names = columns?.map((i) => i.columnName) || [];
  const indexes =
    data &&
    Object.keys(data[0].row)
      .map((item, index) => (names.includes(item) ? index : null))
      .filter((i) => i);

  return (
    <>
      <List name="stelle" overlay={(id) => <Overlay data={data} id={id} />}>
        {data &&
          data.map((item, index) => {
            return (
              <ListItem
                key={index}
                name="stelle"
                id={index.toString()}
                className="flex justify-between items-center px-6 py-2"
              >
                <Typo bold space={false}>
                  {item.row.Titel}
                </Typo>
                <Typo bold space={false}>
                  {item.row.Stadt}
                </Typo>
              </ListItem>
            );
          })}
      </List>
    </>
  );
};

export default GSheet;

const Overlay: React.FC<{ data: any; id: string }> = (props) => {
  const { data, id } = props;

  const item = data && data[id];

  return (
    <div className=" whitespace-pre-line ">
      <Typo variant="h4">{item.row.Titel}</Typo>

      {item && <Typo>{item.row["beschreibe Sie die Stellung"]}</Typo>}

      <Typo bold>
        <a href={`mailto:${item.row["Kontakt E-Mail-Adresse"]}`}>
          {item.row["Kontakt E-Mail-Adresse"]}
        </a>
      </Typo>
    </div>
  );
};
