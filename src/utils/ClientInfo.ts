import { UAParser } from "ua-parser-js";

export const getClientInfo = async () => {
  const parser = new UAParser();
  const result = parser.getResult();

  const browser = result.browser.name ?? "Unknown";
  const device = result.device.type ?? "Unknown";
  const os = result.os.name ?? "Unknown";
  const userAgent = navigator.userAgent ?? "Unknown";

  const ipRes = await fetch("https://api.ipify.org?format=json");
  const { ip } = await ipRes.json();

  return {
    ip,
    userAgent,
    device,
    browser,
    os,
  };
};
