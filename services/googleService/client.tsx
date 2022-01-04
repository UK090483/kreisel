import { google } from "googleapis";

import secretKey from "../../serviceAccounts/googleServiceAccount.json";

let jwtClient = new google.auth.JWT(
  secretKey.client_email,
  undefined,
  secretKey.private_key,
  ["https://www.googleapis.com/auth/spreadsheets"]
);

jwtClient.authorize(function (err, tokens) {
  if (err) {
    console.log(err);
    return;
  } else {
    console.log("Successfully connected!");
  }
});

export { jwtClient };
