import React from "react";
import BlockContent from "@sanity/block-content-to-react";

export interface SanityBlock {
  _type: "block";
  style: string;
  [key: string]: any;
}

export type MarkProps<P = {}> = {
  children: string[];
  mark: { _type: string } & P;
  markKey: string;
  _key: string;
};

export type PlugProps<P = {}> = {
  children?: string[];
  node: { _type: string; _key: string } & P;
  markKey: string;
  _key: string;
};

interface ISanityRichTextProps {
  marks?: Record<string, (props: any) => JSX.Element | null>;
  plugs?: Record<string, (props: any) => JSX.Element | null>;
  content: SanityBlock[];
  list?: React.ReactNode;
  listItem?: React.Component;
  blockRenderer?: (props: BlockRendererProps) => any;
  dataset?: string;
  projectId?: string;
}

interface BlockRendererProps {
  children: (string | React.ReactElement)[];
  node: SanityBlock;
  options: {
    dataset?: string;
    projectId?: string;
    ignoreUnknownTypes: boolean;
    imageOptions: { [k: string]: unknown };
  };
}

const SanityRichText: React.FunctionComponent<ISanityRichTextProps> = (
  props
) => {
  const {
    plugs = {},
    marks = {},
    list,
    content,
    blockRenderer,
    dataset,
    projectId,
  } = props;
  const BlockRenderer = (props: BlockRendererProps) => {
    const br = blockRenderer && blockRenderer(props);
    //@ts-ignore
    return br ? br : BlockContent.defaultSerializers.types.block(props);
  };

  return (
    <BlockContent
      dataset={dataset || process.env.SANITY_PROJECT_DATASET}
      projectId={projectId || process.env.SANITY_PROJECT_ID}
      blocks={content}
      serializers={{
        list,
        types: { ...plugs, block: BlockRenderer },
        marks,
      }}
    />
  );
};

export default SanityRichText;
