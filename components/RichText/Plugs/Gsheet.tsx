import Button from "@components/Button/Button";
import useCSV from "@hooks/useCsv";
import { PlugProps } from "privateModules/SanityPageBuilder/lib/RichText";
import * as React from "react";

interface IGSheetProps extends PlugProps<{ url?: string | null }> {}

const GSheet: React.FunctionComponent<IGSheetProps> = (props) => {
  const url = props?.node?.url;

  const csv = useCSV({ hot: true, url });

  const downloadLink = url && url?.replace("csv", "pdf");

  const { data, loading, reload } = csv;

  console.log(downloadLink);

  return (
    <>
      {/* <Button
        onClick={reload}
        className={` transition-colors ${loading ? "bg-blue-600" : ""}  `}
      >
        Reload
      </Button> */}

      <table className=" w-full table-fixed mb-12">
        <thead>
          <tr>
            {data &&
              data[0] &&
              Object.keys(data[0].row).map((value) => {
                return (
                  <th className="px-4 py-2 " key={value}>
                    {value}
                  </th>
                );
              })}
          </tr>
        </thead>
        <tbody>
          {data &&
            data.map((rowItem, index) => {
              return (
                <tr className="border-2   font-medium" key={index}>
                  {rowItem.values.map((value, index) => {
                    return (
                      <td className="  px-2 py-10" key={index}>
                        {value}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
        </tbody>
      </table>
      {downloadLink && (
        <Button
          href={downloadLink}
          external
          className={`transition-colors  ${loading ? "bg-blue-600" : ""}  `}
        >
          Download as pdf
        </Button>
      )}
    </>
  );
};

export default GSheet;
