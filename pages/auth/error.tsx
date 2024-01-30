import authRoutes from "@lib/Auth/authRoutes";
import AuthLayout from "components/Organism/Layout/AuthLayout";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { ReactElement, ReactNode } from "react";

type ErrorType = keyof typeof authRoutes.errors;

type NextPageWithLayout<P> = NextPage<P> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

const messages: Record<ErrorType, { message: string }> = {
  unexpected: {
    message: "Sorry, es ist ein unbekannter Fehler aufgetreten",
  },
  linkExpired: {
    message:
      "der Link ist leider abgelaufen, bitte versuchen sie es noch einmal",
  },
};

const ErrorPage: NextPageWithLayout<{}> = () => {
  const { query } = useRouter();

  const error = (
    query.error &&
    typeof query.error === "string" &&
    messages[query.error as ErrorType]
      ? query.error
      : "unexpected"
  ) as ErrorType;

  const { message } = messages[error];

  return (
    <div className="error">
      <div className="message">{message}</div>
    </div>
  );
};

ErrorPage.getLayout = function getLayout(page) {
  return <AuthLayout backHref="/">{page}</AuthLayout>;
};
// eslint-disable-next-line import/no-unused-modules
export default ErrorPage;
