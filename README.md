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
- [ ] [checkAutomatedTest](./src/libs/checkAutomatedTest/index.md)
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
