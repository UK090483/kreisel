import { variables } from "styles/fonts";
import Document, { Head, Html, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link rel="apple-touch-icon" href="/icon.png"></link>
          <meta name="theme-color" content="#fff" />
        </Head>
        <body
          className={` text-font antialiased ${
            process.env.NODE_ENV === "development" ? "debug-screens" : ""
          } ${variables}  font-sans`}
        >
          <Main />
          <div id="app-portal" />
          <NextScript />
        </body>
      </Html>
    );
  }
}

// eslint-disable-next-line import/no-unused-modules
export default MyDocument;
