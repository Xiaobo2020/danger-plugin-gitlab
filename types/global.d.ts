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

// declare var danger: typeof _danger;
// declare var message: typeof _message;
// declare var warn: typeof _warn;
// declare var fail: typeof _fail;
