import Document, { Head, Html, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link
            href="https://fonts.googleapis.com/css2?family=Caveat:wght@700&family=Montserrat:wght@500;800&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body
          className={`text-black ${
            process.env.NODE_ENV === "development" ? "debug-screens" : ""
          } `}
        >
          <Main />
          <div id="app-portal" />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
