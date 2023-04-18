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

- [checkChangelog](./src/libs/checkChangelog/index.md)
- [checkDescription](./src/libs/checkDescription/index.md)
- [checkLockfile](./src/libs/checkLockfile/index.md)

## Util

- [getAddedLines](./src/utils/getAddedLines/index.md)
- [getChangedFiles](./src/utils/getChangedFiles/index.md)
- [getDangerModule](./src/utils/getDangerModule/index.md)
- [getLogger](./src/utils/getLogger/index.md)
- [isExternal](./src/utils/isExternal/index.md)
