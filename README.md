# Danger Plugins For GitLab

Some simple but useful DangerJS plugins for Gitlab

## Install

```bash
npm install -D danger-plugin-gitlab
```

## Usage

### Import

```javascript
// dangerfile.{js|ts}

// ESModule
import { checkChangelog } from "danger-plugin-gitlab";
// or CommonJS
const { checkChangelog } = require("danger-plugin-gitlab");
```

### Setup

```javascript
// dangerfile.{js|ts}

// use `checkChangelog` to check CHANGELOG in merge request
checkChangelog();
```

## Plugins

- [x] [addLabel](./src/libs/addLabel/index.md)
- [x] [checkAutomatedTest](./src/libs/checkAutomatedTest/index.md)
- [ ] [checkChangelog](./src/libs/checkChangelog/index.md)
- [ ] [checkDescription](./src/libs/checkDescription/index.md)
- [ ] [checkIssue](./src/libs/checkIssue/index.md)
- [ ] [checkLockfile](./src/libs/checkLockfile/index.md)
- [ ] [checkManuallyTested](./src/libs/checkManuallyTested/index.md)
- [ ] [checkMutexUpdate](./src/libs/checkMutexUpdate/index.md)
- [ ] [checkSelfReview](./src/libs/checkSelfReview/index.md)
- [ ] [checkSize](./src/libs/checkSize/index.md)

### addLabel

Add labels according to the changed files.

```typescript
import { addLabel } from "danger-plugin-gitlab";

addLabel([
  { match: /packages\/server\/.*/, name: "server" },
  { match: /packages\/webapp\/.*/, name: "webapp" },
]);
```

### checkAutomatedTest

Check if source files have been modified, but not test files.

```javascript
import { checkAutomatedTest } from "danger-plugin-gitlab";

checkAutomatedTest({
  logType: "fail",
  logMessage:
    "Source files have been modified, but no test files have been added or modified.",
  sourceFileMath: /src\/.*.(?<!test.)(js|ts|jsx|tsx)$/,
  testFileMath: /src\/.*test.*(js|ts|jsx|tsx)$/,
  enableCheck: false,
  checkMessage: "Automated tests added/updated",
});
```

If `enableCheck` is set `true`, you can also add below content into your merge request template to control the behaviour.

```markdown
<!-- gitlab mr template -->

# Checklist

- [x] Automated tests added/updated
```
