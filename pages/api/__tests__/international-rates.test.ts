import axios from "axios";
import { createMocks } from "node-mocks-http";
import type { NextApiRequest, NextApiResponse } from "next";
import handler from "../international-rates";

jest.mock("axios");
jest.mock("@/utils/rateLimit", () => ({ rateLimit: jest.fn(() => true) }));

const mockedAxios = axios as jest.Mocked<typeof axios>;

beforeEach(() => {
  mockedAxios.get.mockReset();
});

it("maps valid v2 rates for every supported target", async () => {
  mockedAxios.get.mockResolvedValue({
    data: [
      { base: "USD", quote: "EUR", rate: 0.87716 },
      { base: "USD", quote: "CLP", rate: 963.89 },
      { base: "USD", quote: "UYU", rate: 40.265 },
      { base: "USD", quote: "GBP", rate: 0 },
      { base: "EUR", quote: "USD", rate: 1.14 },
    ],
  });
  const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
    method: "GET",
    query: { base: "USD" },
  });

  await handler(req, res);

  expect(res._getStatusCode()).toBe(200);
  expect(JSON.parse(res._getData())).toEqual({
    rates: { EUR: 0.87716, CLP: 963.89, UYU: 40.265 },
  });
  expect(mockedAxios.get).toHaveBeenCalledWith(
    "https://api.frankfurter.dev/v2/rates?base=USD",
    { timeout: 8000 },
  );
});

it("accepts UYU as the source currency", async () => {
  mockedAxios.get.mockResolvedValue({
    data: [{ base: "UYU", quote: "USD", rate: 0.02484 }],
  });
  const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
    method: "GET",
    query: { base: "UYU" },
  });

  await handler(req, res);

  expect(JSON.parse(res._getData())).toEqual({ rates: { USD: 0.02484 } });
});

it("rejects unsupported bases and non-GET requests", async () => {
  const invalidBase = createMocks<NextApiRequest, NextApiResponse>({
    method: "GET",
    query: { base: "INVALID" },
  });
  const post = createMocks<NextApiRequest, NextApiResponse>({
    method: "POST",
    query: { base: "USD" },
  });

  await handler(invalidBase.req, invalidBase.res);
  await handler(post.req, post.res);

  expect(invalidBase.res._getStatusCode()).toBe(400);
  expect(post.res._getStatusCode()).toBe(405);
  expect(mockedAxios.get).not.toHaveBeenCalled();
});

it("returns an error when the provider fails", async () => {
  mockedAxios.get.mockRejectedValue(new Error("Network unavailable"));
  const log = jest.spyOn(console, "error").mockImplementation(() => {});
  const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
    method: "GET",
    query: { base: "USD" },
  });

  try {
    await handler(req, res);
    expect(res._getStatusCode()).toBe(502);
  } finally {
    log.mockRestore();
  }
});
