# lockfile

- Make sure the `package-lock.json` (or `yarn.lock`) is up to date when changes were made to `package.json`.
- Check if only `package-lock.json` (or `yarn.lock`) was modified with `package.json` no changed.

```javascript
import { lockfile } from "danger-plugin-gitlab";

lockfile({
  logType: "message",
  lockfilename: "package-lock.json",
  path: "packages/server/",
});
```
