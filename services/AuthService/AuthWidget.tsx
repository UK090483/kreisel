import { Link } from "components/Link";
import useAuth from "lib/Auth/useAuth";
import clsx from "clsx";
import { signIn, signOut } from "next-auth/react";

type UserWidgetProps = {
  className?: string;
};

const AuthWidget: React.FC<UserWidgetProps> = ({ className }) => {
  const { isAuthenticated, member, email } = useAuth();

  return (
    <div className={clsx(className, "flex items-center text-sm ")}>
      <ProfileButton />
      {member && (
        <>
          <Link href="/mitgliederbereich">Mitgliederbereich</Link>
          <Spacer />
        </>
      )}

      <SignInOutButton />
    </div>
  );
};

export default AuthWidget;

const Spacer = () => <span className="px-3">|</span>;

const ProfileButton = () => {
  const { isAuthenticated, member, email } = useAuth();

  if (!isAuthenticated) return null;
  return (
    <>
      <Link
        href="/profile"
        className=" flex items-center justify-center gap-2 "
      >
        <Icon />
        <span>{email}</span>
      </Link>
      <Spacer />
    </>
  );
};

const SignInOutButton = () => {
  const { isAuthenticated } = useAuth();
  const handleClick: React.MouseEventHandler<HTMLButtonElement> = () => {
    if (isAuthenticated) {
      signOut();
    }
    signIn();
  };
  return (
    <button onClick={handleClick}>
      {isAuthenticated ? "Sign out" : "Sign in"}
    </button>
  );
};

const Icon = () => {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className=" fill-current stroke-2 "
    >
      <path d="M22.5 12C22.5 17.799 17.799 22.5 12 22.5V23.5C18.3513 23.5 23.5 18.3513 23.5 12H22.5ZM12 22.5C6.20101 22.5 1.5 17.799 1.5 12H0.5C0.5 18.3513 5.64872 23.5 12 23.5V22.5ZM1.5 12C1.5 6.20101 6.20101 1.5 12 1.5V0.5C5.64872 0.5 0.5 5.64872 0.5 12H1.5ZM12 1.5C17.799 1.5 22.5 6.20101 22.5 12H23.5C23.5 5.64872 18.3513 0.5 12 0.5V1.5ZM15.1667 10.3334C15.1667 12.2664 13.5996 13.8334 11.6667 13.8334V14.8334C14.1519 14.8334 16.1667 12.8187 16.1667 10.3334H15.1667ZM11.6667 13.8334C9.73365 13.8334 8.16665 12.2664 8.16665 10.3334H7.16665C7.16665 12.8187 9.18137 14.8334 11.6667 14.8334V13.8334ZM8.16665 10.3334C8.16665 8.40042 9.73365 6.83342 11.6667 6.83342V5.83342C9.18137 5.83342 7.16665 7.84814 7.16665 10.3334H8.16665ZM11.6667 6.83342C13.5996 6.83342 15.1667 8.40042 15.1667 10.3334H16.1667C16.1667 7.84814 14.1519 5.83342 11.6667 5.83342V6.83342ZM4.40873 19.5204C8.50924 15.4199 15.1575 15.4199 19.258 19.5204L19.9651 18.8133C15.4741 14.3222 8.19265 14.3222 3.70162 18.8133L4.40873 19.5204Z" />
    </svg>
  );
};
