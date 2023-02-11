import { previewClient } from "@services/SanityService/sanity.server";

type logProps = { title: string };
const log = async ({ title }: logProps) => {
  const day = new Date(Date.now()).toISOString().slice(0, 10);
  const _id = `log.${day}`;
  const item = { _type: "logItem", title };

  try {
    await previewClient
      .patch(_id)
      .append("logs", [item])
      .commit({ autoGenerateArrayKeys: true });
  } catch (error: any) {
    if (error.statusCode === 404) {
      await previewClient.create(
        { _id, _type: "log", day, logs: [item] },
        { autoGenerateArrayKeys: true }
      );
    }
  }
};

export default log;
