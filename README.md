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

- [detailedDescription](./src/libs/detailedDescription/index.md)
- [enforceChangelog](./src/libs/enforceChangelog/index.md)
- [lockfile](./src/libs/lockfile/index.md)

## Util

- [getLogger](./src/utils/getLogger/index.md)
