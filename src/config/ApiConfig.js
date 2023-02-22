import { getDomainName } from "../utils/helper";

const apiGateway =
  import.meta.env.VITE_API_GATEWAY_URL ??
  `${window.location.protocol}//${getDomainName()}/api`;

export const API_CONFIG = {
  gateway: apiGateway,
  mockDelay: 2000,
  endpoints: {
    questions: { path: "/questions" },
  },
};
