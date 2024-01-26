import {
  DocumentActionComponent,
  DocumentActionsContext,
  useDocumentOperation,
} from "sanity";

const mitgliederPageId = "84c459c1-6443-45ec-b8be-131441a8efd4";
const mitgliederPageTypeId = "bc359bcc-db23-4283-bc9f-591e3a9f44a3";
const siteConfigType = "siteConfig";

const ApproveAction: DocumentActionComponent = (props) => {
  const { publish, patch } = useDocumentOperation(props.id, props.type);
  const { draft } = props;
  return {
    label: draft ? "Approve" : "Approved",
    tone: draft ? "critical" : "positive",
    disabled: !draft,
    title: "approve",
    onHandle: () => {
      patch.execute([{ set: { approved: true } }], {});
      publish.execute();
      props.onComplete();
    },
  };
};

export const resolveActions = (
  prev: DocumentActionComponent[],
  context: DocumentActionsContext
) => {
  return handleActions(prev, context, [
    {
      condition: { documentId: mitgliederPageId },
      actions: ["discardChanges", "publish"],
    },
    {
      condition: { documentId: mitgliederPageTypeId },
      actions: ["discardChanges", "publish"],
    },
    {
      condition: { schemaType: siteConfigType },
      actions: ["discardChanges", "publish"],
    },
    {
      condition: {
        schemaType: "member",
      },
      actions: ["delete", "discardChanges", "publish", "unpublish", "restore"],
      // customActions: [ApproveAction],
    },
  ]);
};

type handleActionsConfig = {
  condition: {
    documentId?: string;
    schemaType?: string;
    custom?: (context: DocumentActionsContext) => boolean;
  };
  actions: DocumentActionComponent["action"][];
  customActions?: DocumentActionComponent[];
};

const handleActions = (
  prev: DocumentActionComponent[],
  context: DocumentActionsContext,
  config: handleActionsConfig[]
) => {
  let _prev = [...prev];
  config.forEach((conf) => {
    const {
      customActions = [],
      condition: { documentId, schemaType, custom = () => false },
      actions,
    } = conf;
    if (
      documentId === context.documentId ||
      schemaType === context.schemaType ||
      custom(context)
    ) {
      _prev = [
        ...customActions,
        ...prev.filter((i) => actions.includes(i.action)),
      ];
    }
  });
  return _prev;
};
