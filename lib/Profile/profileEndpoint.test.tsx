import { mockClient } from "@services/SanityService/test/testClient";
import { getToken } from "next-auth/jwt";
import getHandler from "./profileEndpoint";
import { testApiHandler, NtarhParameters } from "next-test-api-route-handler";

const customTester = async ({
  hasToken = true,
  ...params
}: Partial<NtarhParameters<any>> & { hasToken?: boolean }) => {
  const sanityClient = mockClient({});
  const clientSet = jest.fn().mockImplementation(() => ({ commit: jest.fn() }));
  const clientPatch = jest.fn().mockImplementation(() => ({ set: clientSet }));
  sanityClient.patch = clientPatch;
  const testResult = await testApiHandler({
    handler: getHandler(sanityClient, (() =>
      hasToken ? { token: "bla" } : undefined) as unknown as typeof getToken),
    test: async () => {},
    ...params,
  });

  return {
    testResult,
    sanity: { client: sanityClient, clientSet, clientPatch },
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
  it("should return 400 if no body", async () => {
    await customTester({
      test: async ({ fetch }) => {
        const res = await fetch({ method: "POST" });
        // expect(res.status).toBe(400);
      },
    });
  });

  // it("should write data", async () => {
  //   const {
  //     sanity: { clientPatch, clientSet },
  //   } = await customTester({
  //     test: async ({ fetch }) => {
  //       const res = await fetch({
  //         method: "POST",
  //         body: JSON.stringify({
  //           city: "testCity",
  //         }),
  //       });
  //       expect(res.status).toBe(200);
  //     },
  //   });
  //   expect(clientSet).toBeCalledWith({ city: "testCity" });
  // });

  // it("should write strip unknown fields ", async () => {
  //   const {
  //     sanity: { clientPatch, clientSet },
  //   } = await customTester({
  //     test: async ({ fetch }) => {
  //       const res = await fetch({
  //         method: "POST",
  //         body: JSON.stringify({
  //           city: "testCity",
  //           bla: "bla",
  //         }),
  //       });
  //       expect(res.status).toBe(200);
  //     },
  //   });
  //   expect(clientSet).toBeCalledWith({ city: "testCity" });
  // });
});
