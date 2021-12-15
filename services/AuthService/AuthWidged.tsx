import { Link } from "@components/Link";
import { useSession, signIn, signOut } from "next-auth/react";

type UserWidgetProps = {};

const UserWidget: React.FC<UserWidgetProps> = () => {
  const s = useSession();
  const { data: session } = s;

  return (
    <div className="flex text-sm pr-8 ">
      <Icon />
      <Link href="/mitgliederbereich" className=" px-3 ">
        Mitgliederbereich
      </Link>
      {session ? (
        <button onClick={() => signOut()}>Sign out</button>
      ) : (
        <button onClick={() => signIn()}>Sign in</button>
      )}
    </div>
  );
};

export default UserWidget;

const Icon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
    >
      <path
        d="M6 2.95C6.58 2.95 7.05 3.42 7.05 4C7.05 4.58 6.58 5.05 6 5.05C5.42 5.05 4.95 4.58 4.95 4C4.95 3.42 5.42 2.95 6 2.95ZM6 7.45C7.485 7.45 9.05 8.18 9.05 8.5V9.05H2.95V8.5C2.95 8.18 4.515 7.45 6 7.45ZM6 2C4.895 2 4 2.895 4 4C4 5.105 4.895 6 6 6C7.105 6 8 5.105 8 4C8 2.895 7.105 2 6 2ZM6 6.5C4.665 6.5 2 7.17 2 8.5V10H10V8.5C10 7.17 7.335 6.5 6 6.5Z"
        fill="white"
      />
      <rect x="0.5" y="0.5" width="11" height="11" rx="5.5" stroke="white" />
    </svg>
  );
};
