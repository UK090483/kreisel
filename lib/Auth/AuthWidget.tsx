"use client";
import { useAuth } from "lib/Auth/AuthContext";
import Button from "components/Atoms/Button/Button";
// import Svg from "components/Atoms/Svg";
import clsx from "clsx";

type UserWidgetProps = {
  className?: string;
};

const AuthWidget: React.FC<UserWidgetProps> = ({ className }) => {
  const { member, email, isAuthenticated } = useAuth();

  return (
    <div className={clsx(className, "flex items-center text-sm ")}>
      {isAuthenticated && (
        <>
          <div>{email}</div>
          <Spacer />
        </>
      )}

      <ProfileButton />
      {member && (
        <>
          <Button size="s" href="/mitgliederbereich">
            Mitgliederbereich
          </Button>
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
      <Button
        size="s"
        href="/profile"
        className="flex items-center justify-center gap-2"
      >
        {/* <Svg
          icon="profile"
          size="s"
          className="h-2.5 w-2.5"
          pathProps={{ strokeWidth: 0.5 }}
        /> */}
        <span>zum Profil</span>
      </Button>
      <Spacer />
    </>
  );
};

const SignInOutButton = () => {
  const { isAuthenticated, signIn, signOut } = useAuth();
  const handleClick: React.MouseEventHandler<HTMLButtonElement> = () => {
    if (isAuthenticated) {
      signOut();
    }
    if (!isAuthenticated) {
      signIn();
    }
  };
  return (
    <Button
      size="s"
      aria-label={isAuthenticated ? "Sign out" : "Sign in"}
      onClick={handleClick}
    >
      {isAuthenticated ? "Sign out" : "Sign in"}
    </Button>
  );
};
