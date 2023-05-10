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

- [addLabel](#addlabel)
- [checkAutomatedTest](#checkautomatedtest)
- [checkChangelog](#checkchangelog)
- [checkDescription](#checkdescription)
- [checkIssueTicket](#checkissueticket)
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
<!-- merge request template -->

# Checklist

- [x] Automated tests added/updated
```

### checkChangelog

Make sure every change is recorded in the CHANGELOG.

```typescript
import { checkChangelog } from "danger-plugin-gitlab";

checkChangelog({
  logFile: "changelog.md",
  logType: "warn",
  logMessage: "Please add a changelog entry for your changes.",

  enableSkip: false,
  skipMessage: "Skip CHANGELOG check",
});
```

If `enableSkip` is set `true`, you can also add below content into your merge request template to control the behaviour.

```markdown
<!-- merge request template -->

# Skip

- [x] Skip CHANGELOG check
```

### checkDescription

Make sure each merge request has a detailed description.

```typescript
import { checkDescription } from "danger-plugin-gitlab";

checkDescription({
  logType: "message",
  minLength: 50,
  logMessage: "Please provide a summary in the merge request description.",
});
```

### checkIssueTicket

Check if an ISSUE ticket exists in the title or description of merge request template. Or add `NO-ISSUE` to indicate no issue ticket is required.

```javascript
import { checkIssueTicket } from "danger-plugin-gitlab";

checkIssueTicket({
  logType: "warn",
  key: "JIRA",
  location: "title",
  logMessage: `Please include a ticket (like \`XXX-DDDD\` or \`NO-ISSUE\` if there is no ticket) at the beginning of the MR title`;
});
```
