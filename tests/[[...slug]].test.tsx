/**
 * @jest-environment jsdom
 */

import { fireEvent, render, screen } from "@testing-library/react";

import PageComponent from "../pages/[[...slug]]";

jest.mock("@services/SanityService/sanity.server", () => {
  return {
    getSanityClient: jest.fn(() => {
      return {
        fetch: () => Promise.resolve([{ slug: "test" }]),
      };
    }),
  };
});

describe("Page", () => {
  test("smoke", () => {});
});
