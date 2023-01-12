import { DocumentActionComponent, DocumentActionsContext } from "sanity";

const mitgliederPageId = "84c459c1-6443-45ec-b8be-131441a8efd4";
const mitgliederPageTypeId = "bc359bcc-db23-4283-bc9f-591e3a9f44a3";
const siteConfigType = "siteConfig";

export const resolveActions = (
  prev: DocumentActionComponent[],
  context: DocumentActionsContext
) => {
  if ([siteConfigType].includes(context.schemaType)) {
    return prev.filter(
      (p) =>
        !["unpublish", "duplicate", "delete"].includes(p.action || "noname")
    );
  }

  if (
    [mitgliederPageId, mitgliederPageTypeId].includes(context.documentId || "")
  ) {
    return prev.filter(
      (p) =>
        !["unpublish", "duplicate", "delete"].includes(p.action || "noname")
    );
  }

  return prev;
};
