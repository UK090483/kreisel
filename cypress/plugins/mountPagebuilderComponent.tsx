import { ComponentType } from "react";

type PartialOrWhatever<T> = {
  [P in keyof T]?: T[P];
} & { [k: string]: any };

type mountPageBuilderComponentProps<P> = {
  Component: ComponentType;
  props?: P;
  context?: Parameters<typeof cy.mountWithContext>["1"]["context"];
  blockQuery?: string;
  blockData?: PartialOrWhatever<P>;
  dataSet?: any[];
};

export function mountPageBuilderComponent<P = {}>({
  Component,
  blockQuery,
  props,
  blockData,
  context,
  dataSet,
}: mountPageBuilderComponentProps<P>) {
  if (blockQuery) {
    return cy
      .runSanityQuery({
        blockQuery,
        blockData,
        dataSet,
      })
      .then((i) => {
        cy.mountWithContext(<Component {...i} {...props} />, { context });
      });
  }
  return cy.mountWithContext(<Component {...props} />, { context });
}
