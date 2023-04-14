const mappings = {
  fail: fail,
  warn: warn,
  message: message,
} as const;

export type LogType = keyof typeof mappings;

function getMessageLog<T extends LogType>(logType: T): (typeof mappings)[T] {
  return mappings[logType] || mappings["warn"];
}

export default getMessageLog;
