import { toast } from "react-toastify";
import { TOASTIFY_OPTIONS } from "../config/ToastifyConfig";

export const toastWithAsyncFetch = async (messages, fetchFunc, successCallback, errorCallback) => {
  const toastId = toast.loading(messages.loading ?? "Đang cập nhật");

  try {
    const res = await fetchFunc();

    if (res?.status === 200) {
      successCallback && successCallback(res);
      toast.update(toastId, {
        ...TOASTIFY_OPTIONS,
        render: messages.success ?? "Thành công",
        type: toast.TYPE.SUCCESS,
        isLoading: false,
      });

      return true;
    }
  } catch (e) {
    errorCallback && errorCallback(e);
    console.log(e);
    toast.update(toastId, {
      ...TOASTIFY_OPTIONS,
      render: messages.error ?? "Không thành công",
      type: toast.TYPE.ERROR,
      isLoading: false,
    });

    return false;
  }
};

export const getDomainName = () => {
  const hostName = window.location.hostname;
  if (
    hostName === "localhost" ||
    hostName === "[::1]" ||
    hostName.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/)
  ) {
    return hostName + ":" + window.location.port;
  }

  return hostName;
};

export const absoluteURL = (path = "") => {
  if (path.match(/^https?/) || path.match(/^\/\//)) {
    return path;
  } else {
    return [
      (window.location.protocol + "//" + getDomainName()).replace(/([/]+)$/, ""),
      path.replace(/^([/]+)/, ""),
    ].join("/");
  }
};

export const dataURLtoFile = (dataurl, filename) => {
  const arr = dataurl.split(",");
  const mime = arr[0].match(/:(.*?);/)[1];
  const bstr = atob(arr[1]);

  let n = bstr.length;
  let u8arr = new Uint8Array(n);

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }

  return new File([u8arr], filename, { type: mime });
};

export const convertSecondsToTime = (timeInSeconds, unit) => {
  timeInSeconds = Number(timeInSeconds);

  if (unit === "hours") {
    return (timeInSeconds / 3600) % 1 > 0.825
      ? Math.ceil(timeInSeconds / 3600)
      : Math.floor(timeInSeconds / 3600);
  }
  if (unit === "minutes") {
    return timeInSeconds > 60
      ? ((timeInSeconds % 3600) / 60) % 1 > 0.6
        ? Math.ceil((timeInSeconds % 3600) / 60)
        : Math.floor((timeInSeconds % 3600) / 60)
      : 1;
  }
  if (unit === "seconds") {
    return Math.floor((timeInSeconds % 3600) % 60);
  }

  return new Date(timeInSeconds * 1000).toISOString().slice(timeInSeconds > 3600 ? 11 : 14, 19);
};
