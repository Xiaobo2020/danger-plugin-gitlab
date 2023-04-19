# Danger Plugins For GitLab

> Some useful DangerJS plugins for use in Gitlab

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

## Plugins

- [addLabel](./src/libs/addLabel/index.md)
- [checkAutomatedTest](./src/libs/checkAutomatedTest/index.md)
- [checkChangelog](./src/libs/checkChangelog/index.md)
- [checkDescription](./src/libs/checkDescription/index.md)
- [checkIssue](./src/libs/checkIssue/index.md)
- [checkLockfile](./src/libs/checkLockfile/index.md)
- [checkSelfReview](./src/libs/checkSelfReview/index.md)
- [checkSize](./src/libs/checkSize/index.md)

## TODO

- [ ] checkMaunallyTested
- [ ] checkSimultaneouslyDeploy
- [ ] ...
