import { DocumentPluginOptions, DocumentBadgeComponent } from "sanity";

const ReviewBatch: DocumentBadgeComponent = (props) => {
  const { draft } = props;
  return {
    color: draft ? "danger" : "success",
    label: draft ? "needs Review" : "Reviewed",
    title: "review",
  };
};

export const resolveBadges: DocumentPluginOptions["badges"] = (
  prev,
  context
) => {
  if (context.schemaType === "member") {
    return [ReviewBatch];
  }
  return [...prev];
};
