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
- [lockfile](./doc/libs/lockfile.md)

## Util

- [getLogger](./doc/utils/getLogger.md)
