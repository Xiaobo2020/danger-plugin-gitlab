# Danger Plugins For GitLab

## Install

```bash
npm install -D danger-plugin-gitlab
```

## Usage

```javascript
// ESModule
import { checkChangelog } from "danger-plugin-gitlab";

// or CommonJS
const { checkChangelog } = require("danger-plugin-gitlab");

// use enforceChangelog with default options
checkChangelog();

// or custom the options
checkChangelog({
  logFile: "changelog.md",
  logType: "warn",
  logMessage: "Please add a changelog entry for your changes.",
});
```

## TODO

- [ ] addLabel
- [ ] checkAutomatedTest
- [ ] checkJiraIssue
- [ ] ...

## Library

- [checkChangelog](./src/libs/checkChangelog/index.md)
- [checkDescription](./src/libs/checkDescription/index.md)
- [checkLockfile](./src/libs/checkLockfile/index.md)
- [checkSize](./src/libs/checkSize/index.md)

## Util

- [getAddedLines](./src/utils/getAddedLines/index.md)
- [getChangedFiles](./src/utils/getChangedFiles/index.md)
- [getDangerModule](./src/utils/getDangerModule/index.md)
- [getLogger](./src/utils/getLogger/index.md)
- [isExternal](./src/utils/isExternal/index.md)
