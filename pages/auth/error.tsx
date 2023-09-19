import AuthLayout from "components/Organism/Layout/AuthLayout";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { ReactElement, ReactNode } from "react";

type ErrorType = "default" | "configuration" | "accessdenied" | "verification";

type NextPageWithLayout<P> = NextPage<P> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

const messages: Record<ErrorType, { message: string }> = {
  accessdenied: { message: "You do not have permission to sign in." },
  configuration: {
    message: "There is a problem with the server configuration.",
  },
  verification: { message: "The sign in link is no longer valid." },
  default: { message: "Es ist ein unbekannter Fehler aufgetreten" },
};

const ErrorPage: NextPageWithLayout<{}> = (props) => {
  const signinPageUrl = `/signin`;

  const { query } = useRouter();

  const error = (
    query.error && typeof query.error === "string"
      ? query.error.toLowerCase()
      : "default"
  ) as ErrorType;

  const { message } = messages[error] ?? messages.default;

  return (
    <div className="error">
      <div className="message">{message}</div>
    </div>
  );
};

ErrorPage.getLayout = function getLayout(page) {
  return <AuthLayout>{page}</AuthLayout>;
};
// eslint-disable-next-line import/no-unused-modules
export default ErrorPage;
