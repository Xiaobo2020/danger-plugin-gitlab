import {
  danger as _danger,
  fail as _fail,
  warn as _warn,
  message as _message,
} from "danger";

declare global {
  var danger: typeof _danger;
  var message: typeof _message;
  var warn: typeof _warn;
  var fail: typeof _fail;
}
