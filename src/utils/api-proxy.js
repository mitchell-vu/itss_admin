import axios from "axios";

/**
 * @typedef {string | {
 * path: string,
 * method: RequestMethod,
 * mock: (url: string, request: Request) => Dict
 * }} EndpointConfig
 */

/**
 * @typedef {{
 * gateway: string | URL,
 * endpoints: Dict<EndpointConfig>,
 * sharedParams: Dict<any>,
 * }} APIProxyOptions
 */

/**
 * Proxy layer for any type of API's
 */
export class APIProxy {
  /** @type {string} */
  gateway = null;

  /** @type {Dict<string>} */
  commonHeaders = {};

  /** @type {number} */
  mockDelay = 0;

  /** @type {Dict} */
  sharedParams = {};

  /**
   * Constructor
   * @param {APIProxyOptions} options
   */
  constructor(options) {
    this.gateway = this.resolveGateway(options.gateway);
    this.commonHeaders = options.commonHeaders ?? {};
    this.sharedParams = options.sharedParams ?? {};
    this.mockDelay = options.mockDelay ?? 0;

    this.resolveMethods(options.endpoints);
  }

  /**
   * Check if method exists
   * @param {String} method
   */
  isValidMethod(method) {
    return this[method] instanceof Function;
  }

  /**
   * Resolves gateway to a full URL
   * @returns {string}
   */
  resolveGateway(url) {
    if (url instanceof URL) {
      return url.toString();
    }

    try {
      return new URL(url).toString();
    } catch (e) {
      const gateway = new URL(window.location.href);
      gateway.search = "";
      gateway.hash = "";

      if (url[0] === "/") {
        gateway.pathname = url.replace(/([/])$/, "");
      } else {
        gateway.pathname = `${gateway.pathname}/${url}`
          .replace(/([/]+)/g, "/")
          .replace(/([/])$/, "");
      }
      return gateway.toString();
    }
  }

  /**
   * Build methods list from endpoints
   * @private
   */
  resolveMethods(endpoints, parentPath) {
    if (endpoints) {
      const methods = new Map(Object.entries(endpoints));

      methods.forEach((settings, methodName) => {
        const { ...restSettings } = this.getSettings(settings);

        Object.defineProperty(this, methodName, {
          value: this.createApiCallExecutor(restSettings, [parentPath]),
        });
      });
    }
  }

  /**
   * Actual API call
   * @param {EndpointConfig} methodSettings
   * @private
   */
  createApiCallExecutor(methodSettings, parentPath) {
    return async (urlParams, { headers, body } = {}) => {
      const finalParams = {
        ...(urlParams ?? {}),
        ...(this.sharedParams ?? {}),
      };

      const { method, url: apiCallURL } = this.createUrl(
        methodSettings.path,
        finalParams,
        parentPath
      );

      const requestMethod =
        method?.toLowerCase() ?? (methodSettings.method ?? "get").toLowerCase();
      const requestHeaders = Object.assign(
        this.commonHeaders ?? {},
        headers ?? {}
      );

      /** @type {Response} */
      let rawResponse;
      try {
        if (
          methodSettings.mock &&
          process.env.NODE_ENV === "development" &&
          !import.meta.env.VITE_API_GATEWAY_URL
        ) {
          rawResponse = await this.mockRequest(urlParams, body, methodSettings);
        } else {
          rawResponse =
            requestMethod === "get"
              ? await axios.get(apiCallURL, { headers: requestHeaders })
              : await axios({
                  method: requestMethod,
                  url: apiCallURL,
                  headers: requestHeaders,
                  data: body,
                });
        }
      } catch (e) {
        e.response.error = true;
        return e.response;
      }

      return rawResponse;
    };
  }

  /**
   * Retrieve method-specific settings
   * @private
   * @param {EndpointConfig} settings
   * @returns {EndpointConfig}
   */
  getSettings(settings) {
    if (typeof settings === "string") {
      settings = {
        path: settings,
      };
    }

    return {
      method: "get",
      mock: undefined,
      ...settings,
    };
  }

  /**
   * Creates a URL from gateway + endpoint path + params
   * @param {string} path
   * @param {Dict} data
   * @private
   */
  createUrl(endpoint, data = {}, parentPath) {
    const url = new URL(this.gateway);
    const usedKeys = [];
    const { path: resolvedPath, method: resolvedMethod } = this.resolveEndpoint(
      endpoint,
      data
    );
    const path = []
      .concat(...(parentPath ?? []), resolvedPath)
      .filter((p) => p !== undefined)
      .join("/")
      .replace(/([/]+)/g, "/");

    const processedPath = path.replace(/:([^/]+)/g, (...res) => {
      const keyRaw = res[1];
      const [key, optional] = keyRaw.match(/([^?]+)(\??)/).slice(1, 3);
      const result = data[key];

      usedKeys.push(key);

      if (result === undefined) {
        if (optional === "?") return "";
        throw new Error(`Can't find key \`${key}\` in data`);
      }

      return result;
    });

    url.pathname += processedPath.replace(/\/+/g, "/").replace(/\/+$/g, "");

    if (data && typeof data === "object") {
      Object.entries(data).forEach(([key, value]) => {
        if (!usedKeys.includes(key)) {
          url.searchParams.set(key, value);
        }
      });
    }

    return {
      url: url.toString(),
      method: resolvedMethod,
    };
  }

  /**
   * Resolves an endpoint
   * @param {string|Function} endpoint
   * @param {Dict} data
   */
  resolveEndpoint(endpoint, data) {
    let finalEndpoint;
    if (endpoint instanceof Function) {
      finalEndpoint = endpoint(data);
    } else {
      finalEndpoint = endpoint;
    }

    const methodRegexp = /^(GET|POST|PATCH|DELETE|PUT|HEAD|OPTIONS):/;
    const method = finalEndpoint.match(methodRegexp)?.[1];
    const path = finalEndpoint.replace(methodRegexp, "");

    return { method, path };
  }

  /**
   * Emulate server call
   * @param {string} url
   * @param {Request} params
   * @param {EndpointConfig} settings
   */
  mockRequest(params, body, settings) {
    return new Promise(async (resolve) => {
      let response = null;

      if (typeof settings.mock === "function") {
        response = settings.mock(params, body);
      } else {
        response = settings.mock;
      }

      setTimeout(() => {
        resolve({
          status: 200,
          data: response,
        });
      }, this.mockDelay);
    });
  }
}
