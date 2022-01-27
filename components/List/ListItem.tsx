import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

interface ListItemProps {
  name: string;
  id: string;
  className?: string;
}

const ListItem: React.FC<ListItemProps> = (props) => {
  const { children, name, id, className } = props;
  const r = useRouter();
  const { asPath } = r;

  return (
    <li
      className={`rounded-theme w-full  odd:bg-primary-light list-none mb-2 p-0.5 `}
    >
      <Link
        href={{ pathname: asPath, query: { [name]: id } }}
        scroll={false}
        shallow={true}
        replace
      >
        <a
          data-testid="listItemLink"
          className={`hover:ring-4 rounded-theme ring-primary ${className}`}
        >
          {children}
        </a>
      </Link>
    </li>
  );
};

export default ListItem;
