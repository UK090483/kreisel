import Underline from "@components/Underline/Underline";
import * as React from "react";

interface IContactButtonProps {}

const ContactButton: React.FunctionComponent<IContactButtonProps> = (props) => {
  return (
    <a className=" hidden lg:block text-lg" href="mailto:kreisel">
      <Underline color="primary" variant={3}>
        <span className=" text-base whitespace-nowrap">Kontakt aufnehmen</span>
      </Underline>
    </a>
  );
};

export default ContactButton;
