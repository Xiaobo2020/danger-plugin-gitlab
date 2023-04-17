# Danger Plugins For GitLab

## Install

```bash
npm install -D danger-plugin-gitlab
```

## Usage

```javascript
// ESModule
import { enforceChangelog } from "danger-plugin-gitlab";

// or CommonJS
const { enforceChangelog } = require("danger-plugin-gitlab");

// use enforceChangelog with default options
enforceChangelog();

// just equal to
enforceChangelog({
  filename: "changelog.md",
  logType: "warn",
  checkMessage: "This is a trival MR and no CHANGELOG changes required.",
  logMessage: "Please add a changelog entry for your changes.",
});
```

## TODO

- [ ] smallMR
- [ ] moreTesting
- [ ] ...

## Library

- [enforceChangelog](./doc/libs/enforceChangelog.md)
- [detailedDescription](./doc/libs/detailedDescription.md)

### lockfile

- Make sure the `package-lock.json` (or `yarn.lock`) is up to date when changes were made to `package.json`.
- Check if only `package-lock.json` (or `yarn.lock`) was modified with `package.json` no changed.

```javascript
lockfile({
  logType: "message",
  lockfilename: "package-lock.json",
  path: "packages/server/",
});
```
