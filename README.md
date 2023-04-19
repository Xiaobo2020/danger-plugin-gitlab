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

- [ ] ...

## Library

- [addLabel](./src/libs/addLabel/index.md)
- [checkAutomatedTest](./src/libs/checkAutomatedTest/index.md)
- [checkChangelog](./src/libs/checkChangelog/index.md)
- [checkDescription](./src/libs/checkDescription/index.md)
- [checkIssue](./src/libs/checkIssue/index.md)
- [checkLockfile](./src/libs/checkLockfile/index.md)
- [checkSize](./src/libs/checkSize/index.md)

## Util

- [getAddedLines](./src/utils/getAddedLines/index.md)
- [getDangerModule](./src/utils/getDangerModule/index.md)
- [getLogger](./src/utils/getLogger/index.md)
- [inCommit](./src/utils/inCommit/index.md)
- [inCommitGrep](./src/utils/inCommitGrep/index.md)
- [isExternal](./src/utils/isExternal/index.md)
