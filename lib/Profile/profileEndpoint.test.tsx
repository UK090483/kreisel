/**
 * @jest-environment node
 */

import getHandler from "./profileEndpoint";
import { mockClient } from "@services/SanityService/test/testClient";
import { getToken } from "next-auth/jwt";
import { testApiHandler, NtarhParameters } from "next-test-api-route-handler";
import FormData from "form-data";
import formidable from "formidable";
import type { PageConfig } from "next";

// jest.mock("formidable", () => ({
//   ...jest.requireActual("formidable"),
//   __esModule: true,
//   default: jest.fn(),
// }));

const formidableMock = formidable as unknown as jest.Mock<any>;

function prepareHandler(
  client: Parameters<typeof getHandler>[0],
  hasToken: boolean
) {
  const handler = getHandler(client, (() =>
    hasToken
      ? { email: "testEmail" }
      : undefined) as unknown as typeof getToken);

  const config: PageConfig = {
    api: {
      bodyParser: false,
    },
  };
  //@ts-ignore
  handler.config = config;
  return handler;
}

const testDbItem = {
  _type: "member",
  email: { current: "testEmail" },
  _id: "testId",
};

const defaultDB = [testDbItem];
const testValues = {
  city: "testCity",
  firstName: "testFirstName",
  name: "testName",
};

const formdata = () => {
  const form = new FormData();
  form.append("data", JSON.stringify(testValues));

  return form;
};

const customTester = async ({
  hasToken = true,
  database = defaultDB,
  ...params
}: Partial<NtarhParameters<any>> & {
  hasToken?: boolean;
  database?: any[];
}) => {
  const sanityClient = mockClient({
    database,
  });
  const clientCommit = jest.fn().mockImplementation(() => ({ _id: "any" }));
  const clientSet = jest
    .fn()
    .mockImplementation(() => ({ commit: clientCommit }));
  const clientPatch = jest.fn().mockImplementation(() => ({ set: clientSet }));
  const clientCreate = jest.fn().mockImplementation(() => ({ _id: "any" }));
  sanityClient.patch = clientPatch;
  sanityClient.create = clientCreate;
  const testResult = await testApiHandler({
    requestPatcher: (req) => {
      req.headers = { "content-type": "multipart/form-data" };
    },

    handler: prepareHandler(sanityClient, hasToken),
    test: async () => {},
    ...params,
  });

  return {
    testResult,
    sanity: { client: sanityClient, clientSet, clientPatch, clientCreate },
  };
};

describe("profileEndpoint", () => {
  it("should return 401 if no token", async () => {
    await customTester({
      hasToken: false,
      test: async ({ fetch }) => {
        const res = await fetch({ method: "POST" });
        expect(res.status).toBe(401);
      },
    });
  });

  // it("should create draft if no draft is found", async () => {
  //   const formData = formdata();
  //   const {
  //     sanity: { clientCreate },
  //   } = await customTester({
  //     requestPatcher: (req) => (req.headers = formData.getHeaders()),
  //     test: async ({ fetch }) => {
  //       const res = await fetch({
  //         method: "POST",
  //         body: formData,
  //       });
  //       expect(res.status).toBe(200);
  //     },
  //   });
  //   expect(clientCreate).toBeCalledWith({
  //     ...testDbItem,
  //     _id: "drafts." + testDbItem._id,
  //     ...testValues,
  //   });
  // });

  // it("should write to draft if draft is found", async () => {
  //   const {
  //     sanity: { clientPatch, clientSet, client },
  //   } = await customTester({
  //     database: [
  //       testDbItem,
  //       { ...testDbItem, _id: "drafts." + testDbItem._id },
  //     ],
  //     test: async ({ fetch }) => {
  //       const res = await fetch({
  //         method: "POST",
  //         body: formdata(),
  //       });
  //       expect(res.status).toBe(200);
  //     },
  //   });
  //   expect(clientPatch).toBeCalledWith("drafts.testId");
  //   expect(clientSet).toBeCalledWith(testValues);
  // });
});
