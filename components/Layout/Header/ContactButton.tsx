import Button from "components/Button/Button";
import * as React from "react";

interface IContactButtonProps {}

const ContactButton: React.FunctionComponent<IContactButtonProps> = (props) => {
  return (
    <Button
      href={"mailto:kreisel"}
      className=" bg-primary-light border-primary-light animate-slideInRight"
    >
      Kontakt aufnehmen
    </Button>
  );
};

export default ContactButton;
