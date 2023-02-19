import clsx from "clsx";
import Button from "components/Button/Button";
import * as React from "react";

interface IContactButtonProps {
  className?: string;
  dark?: boolean;
}

const ContactButton: React.FunctionComponent<IContactButtonProps> = (props) => {
  const { className, dark } = props;
  return (
    <Button
      href={"mailto:kreisel"}
      className={clsx(
        " animate-slideInRight",
        {
          "bg-white border-white": dark,
          "bg-primary-light border-primary-light": !dark,
        },
        className
      )}
    >
      Kontakt aufnehmen
    </Button>
  );
};

export default ContactButton;
