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
  linkExpired: {
    message:
      "der Link ist leider abgelaufen, bitte versuchen sie es noch einmal",
  },
};

const ErrorPage: NextPageWithLayout<{}> = () => {
  const { query } = useRouter();
  const error = (
    query.error && typeof query.error === "string"
      ? query.error.toLowerCase()
      : "default"
  ) as ErrorType;

  const { message } =
    messages[error] ?? "Es ist ein unbekannter Fehler aufgetreten";

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
