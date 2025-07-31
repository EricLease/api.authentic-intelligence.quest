import { APP_PORT, APP_FALLBACK_PORT } from "./config.js";

const portConfig = APP_PORT || APP_FALLBACK_PORT;

export default () => {
  const port = parseInt(portConfig, 10);

  if (isNaN(port)) {
    return portConfig;
  }

  if (port >= 0) {
    return port;
  }

  return false;
};
