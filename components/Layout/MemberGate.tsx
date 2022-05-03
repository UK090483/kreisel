import { useMemberPage } from "@components/AppContext/AppContext";
import Kreisel from "@components/Kreisel";
import * as React from "react";

interface IMemberGateProps {}

const MemberGate: React.FunctionComponent<IMemberGateProps> = (props) => {
  const loading = useMemberPage();
  const { children } = props;
  if (loading) {
    return <Loading />;
  }
  return <>{children}</>;
};

export default MemberGate;

const Loading = () => {
  return (
    <div className=" w-screen h-screen flex justify-center items-center  ">
      <Kreisel className=" w-1/3" />
    </div>
  );
};
