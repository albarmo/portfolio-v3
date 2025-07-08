import chalk from "chalk";
import { fork } from "child_process";

const child = fork("./server/child.listerner.js");
const LOG_LEVEL = process.env.NEXT_PUBLIC_LOG_LEVEL || "info";

let logQueue: string[][] = [];
const timeouts = 1000;

const responseStatusColor = (statusCode: number) => {
  switch (statusCode) {
    case 200:
      return `${chalk.bgGreen.white(` ${statusCode} `)}`;
    case 201:
      return `${chalk.bgGreen.white(` ${statusCode} `)}`;
    case 400:
      return `${chalk.bgRedBright.white(` ${statusCode} `)}`;
    case 401:
      return `${chalk.bgRedBright.white(` ${statusCode} `)}`;
    case 403:
      return `${chalk.bgYellow.white(` ${statusCode} `)}`;
    case 500:
      return `${chalk.bgRed.white(` ${statusCode} `)}`;
    case 502:
      return `${chalk.bgRed.white(` ${statusCode} `)}`;
    default:
      return `${chalk.bgGray.white(` ${statusCode} `)}`;
  }
};

function formatLog(
  title: string,
  type?: string,
  message?: string,
  data?: unknown,
  status?: number
) {
  const level = LOG_LEVEL.toLowerCase();
  const statusCode = status || 200;

  switch (level) {
    case "verbose":
      return `${type} ${responseStatusColor(statusCode)} ${chalk.greenBright(
        title
      )} | ${message} | ${chalk.green(JSON.stringify(data))}`;
    case "debug":
      return `${type} ${responseStatusColor(statusCode)} ${chalk.greenBright(
        title
      )} | ${message}`;
    case "info":
      return `${type} ${responseStatusColor(statusCode)} ${chalk.greenBright(
        title
      )}`;
  }
}

setInterval(() => {
  if (logQueue.length > 0) {
    child.send(logQueue);
    logQueue = [];
  }
}, timeouts);

export function logger(
  title: string,
  type?: string,
  message?: string,
  status?: number
) {
  return (data: unknown) => {
    const body = formatLog(title, type, message, data, status);

    const info = () => {
      logQueue.push([`${chalk.blue("! [INFO]")} ${body}`]);
    };

    const error = () => {
      logQueue.push([`${chalk.red(" [ERORR]")} ${body}`]);
    };

    const warn = () => {
      logQueue.push([`${chalk.yellow("▲ [WARN]")} ${body}`]);
    };

    const debug = () => {
      logQueue.push([`${chalk.gray(" [DEBUG]")} ${body}`]);
    };

    return {
      info,
      error,
      warn,
      debug,
    };
  };
}
