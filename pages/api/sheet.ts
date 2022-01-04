// import { jwtClient } from "@services/googleService/client";
import { google } from "googleapis";

import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // let spreadsheetId = "1-lkg7ztmFYZY4PwLa9ztFbo3LTH7IaZUMKcXCr3SqMA";
  // let sheetRange = "A1:C100";
  // let sheets = google.sheets("v4");

  // //   sheets.spreadsheets.get(
  // //     {
  // //       auth: jwtClient,
  // //       spreadsheetId: spreadsheetId,
  // //     },
  // //     (err, response) => {
  // //       console.log(response);
  // //       res.status(200).json(response);
  // //     }
  // //   );

  // sheets.spreadsheets.values.get(
  //   {
  //     auth: jwtClient,
  //     spreadsheetId: spreadsheetId,
  //     range: sheetRange,
  //   },
  //   function (err, response) {
  //     if (err) {
  //       console.log("The API returned an error: " + err);
  //     } else {
  //       console.log("Movie list from Google Sheets:");

  //       console.log(response);

  //       const d = response?.data;

  //       if (d) {
  //         return res.status(200).json(d);
  //       }
  //     }
  //   }
  // );

  res.status(200);
}
