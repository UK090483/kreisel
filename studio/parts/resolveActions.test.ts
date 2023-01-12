import { resolveActions } from "./resolveActions";
import { DocumentActionComponent, DocumentActionsContext } from "sanity";

const mitgliederPageId = "84c459c1-6443-45ec-b8be-131441a8efd4";
const mitgliederPageTypeId = "bc359bcc-db23-4283-bc9f-591e3a9f44a3";
const actions = [
  "delete",
  "discardChanges",
  "duplicate",
  "restore",
  "publish",
  "unpublish",
];

const run = (context: Partial<DocumentActionsContext>) => {
  const testContext = { ...context } as DocumentActionsContext;
  const res = resolveActions(
    actions.map((i) => ({ action: i })) as DocumentActionComponent[],
    testContext
  );
  return res.map((i) => i.action);
};

describe("resolve Actions", () => {
  it.each(actions)("should return %s action", (action) => {
    expect(run({ schemaType: "any", documentId: "any" })).toContain(action);
  });
  it('should disallow "unpublish", "duplicate", "duplicate" for config siteConfig', () => {
    expect(run({ schemaType: "siteConfig" })).not.toContain("unpublish");
    expect(run({ schemaType: "siteConfig" })).not.toContain("duplicate");
    expect(run({ schemaType: "siteConfig" })).not.toContain("duplicate");
  });
  it('should disallow "unpublish", "duplicate", "duplicate" for mitglieder PageType', () => {
    expect(run({ documentId: mitgliederPageTypeId })).not.toContain(
      "unpublish"
    );
    expect(run({ documentId: mitgliederPageTypeId })).not.toContain(
      "duplicate"
    );
    expect(run({ documentId: mitgliederPageTypeId })).not.toContain(
      "duplicate"
    );
  });
  it('should disallow "unpublish", "duplicate", "duplicate" for mitglieder Page', () => {
    expect(run({ documentId: mitgliederPageId })).not.toContain("unpublish");
    expect(run({ documentId: mitgliederPageId })).not.toContain("duplicate");
    expect(run({ documentId: mitgliederPageId })).not.toContain("duplicate");
  });
});
