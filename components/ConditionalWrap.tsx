import React, { FunctionComponent } from "react";

interface IConditionalWrapProps {
  condition: boolean;
  wrap: (children: React.ReactNode) => React.ReactElement;
  children: React.ReactNode;
}

const ConditionalWrap: FunctionComponent<IConditionalWrapProps> = ({
  condition,
  wrap,
  children,
}) => (condition ? wrap(children) : <>{children}</>);

export default ConditionalWrap;
