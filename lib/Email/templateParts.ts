const brandColor = "#F9DE83";
const textColor = "#444";
const backgroundColor = "#fff";

export const HeaderSection = ({ text }: { text: string }) => {
  return `
<tr>
  <td align="center"
    style="padding: 10px 0px; font-size: 22px; font-family: Helvetica, Arial, sans-serif; color: ${textColor};">
     ${text}
  </td>
</tr>
`;
};

export const ButtonSection = ({ text, url }: { text: string; url: string }) => {
  return `
  <tr>
    <td align="center" style="padding: 20px 0;">
      <table border="0" cellspacing="0" cellpadding="0">
        <tr>
          <td align="center" style="border-radius: 5px;" bgcolor="${backgroundColor}"><a href="${url}"
             
              style="font-size: 18px; font-family: Helvetica, Arial, sans-serif; color: ${textColor}; text-decoration: none; border-radius: 5px; padding: 10px 20px; border: 1px solid ${backgroundColor}; display: inline-block; font-weight: bold;">${text}</a></td>
        </tr>
      </table>
    </td>
  </tr>
`;
};

export function html(params: { content?: string[] }) {
  const { content } = params;
  // const escapedHost = host ? host.replace(/\./g, "&#8203;.") : "";
  return `
  <!DOCTYPE html>
  <html lang="de" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
  <body style="background: ${backgroundColor};" >
    <table width="100%" border="0" cellspacing="20" cellpadding="0"
      style="background: ${brandColor}; max-width: 600px; margin: auto; border-radius: 10px;">
     ${content ? content.join(" ") : ""} 
      <tr>
        <td align="center"
          style="padding: 0px 0px 10px 0px; font-size: 16px; line-height: 22px; font-family: Helvetica, Arial, sans-serif; color: ${textColor};">
          Wenn Sie diese E-Mail nicht angefordert haben, können Sie sie ignorieren.
        </td>
      </tr>
    </table>
  </body>
  </html>
  `;
}
