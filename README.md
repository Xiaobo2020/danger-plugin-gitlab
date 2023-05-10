# Danger Plugins For GitLab

Some simple but useful DangerJS plugins for Gitlab

## Install

```bash
npm install -D danger-plugin-gitlab
```

## Plugins

- [addLabel](#addlabel)
- [checkAutomatedTest](#checkautomatedtest)
- [checkChangelog](#checkchangelog)
- [checkDescription](#checkdescription)
- [checkIssueTicket](#checkissueticket)
- [checkLockfile](#checklockfile)
- [checkManuallyTested](#checkmanuallytested)
- [checkMutexUpdate](#checkmutexupdate)
- [checkSelfReview](#checkselfreview)
- [checkSize](#checksize)

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

If `enableCheck` is set `true`, you can also add below content into your merge request description to control the behaviour.

```markdown
<!-- merge request description -->

# Checklist

- [ ] Automated tests added/updated
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

If `enableSkip` is set `true`, you can also add below content into your merge request description to control the behaviour.

```markdown
<!-- merge request description -->

# Skip

- [ ] Skip CHANGELOG check
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

Check if an ISSUE ticket exists in the title or description of merge request description. Or add `NO-ISSUE` to indicate no issue ticket is required.

```typescript
import { checkIssueTicket } from "danger-plugin-gitlab";

checkIssueTicket({
  logType: "warn",
  key: "JIRA",
  location: "title",
  logMessage: "Please include a ticket (like \`XXX-DDDD\` or \`NO-ISSUE\` if there is no ticket) at the beginning of the MR title";
});
```

### checkLockfile

- Make sure the `package-lock.json` (or `yarn.lock`) is up to date when changes were made to `package.json`.
- Check if only `package-lock.json` (or `yarn.lock`) was modified with `package.json` no changed.

```typescript
import { checkLockfile } from "danger-plugin-gitlab";

checkLockfile({
  lockType: "warn",
  lockfile: "package-lock.json",
});

// or custom log type, path and lockfile
checkLockfile({
  lockType: "fail",
  lockfile: "yarn.lock",
  path: "packages/webapp/",
});
```

### checkManuallyTested

Check if author has manually tested their changes when source files have been modified

```typescript
import { checkManuallyTested } from "danger-plugin-gitlab";

checkManuallyTested({
  logType: "fail",
  logMessage:
    "`Manually tested in a web browser` is unchecked in the MR description when source files have been modified.",
  checkMessage: "Manually tested in a web browser",
  sourceFileMath: /src\/.*.(?<!test.)(js|ts|jsx|tsx)$/,
});
```

Make use below content is inserted into the merge request description.

```markdown
<!-- merge request description -->

# Checklist

- [ ] Manually tested in a web browser
```

### checkMutexUpdate

Check if changes have been made to both the server and client code.

```typescript
import { checkMutexUpdate } from "danger-plugin-gitlab";

const SKIP_SERVER_CLIENT_MUTEX_CHECK =
  "I am familiar with the danger of releasing webapp and server changes simultaneously";

checkMutexUpdate({
  logType: "fail",
  logMessage: `The reviewer must check the \`${SKIP_SERVER_CLIENT_MUTEX_CHECK}\` toggle, or the pull request should be split.`,
  mutexItems: [
    {
      match: /packages\/server\/(?!app\/tests\/).*/,
      name: "server",
    },
    {
      match: /packages\/client\/.*/,
      name: "webapp",
    },
  ],
  enableSkip: true,
  skipMessage: SKIP_SERVER_CLIENT_MUTEX_CHECK,
});
```

If `enableSkip` is set `true`, you can also add below content into your merge request description to control the behaviour.

```markdown
<!-- merge request description -->

# Skip

- [ ] I am familiar with the danger of releasing webapp and server changes simultaneously
```

### checkSelfReview

Check if author has reviewed their code.

```typescript
import { checkSelfReview } from "danger-plugin-gitlab";

checkSelfReview({
  logType: "warn",
  logMessage:
    "`Code has been reviewed by the author` is unchecked in the MR description.",
  checkMessage: "Code has been reviewed by the author",
});
```

Make use below content or custom check message is inserted into the merge request description.

```markdown
<!-- merge request description -->

# Checklist

- [ ] Code has been reviewed by the author
```

### checkSize

Encourage smaller merge request.

```typescript
import { checkSize } from "danger-plugin-gitlab";

checkSize({
  logType: "fail",
  maxSize: 20,
  logMessage: ({ createdFiles, modifiedFiles }) =>
    `This MR contains ${[...createdFiles, ...modifiedFiles].length} files (${
      createdFiles.length
    } new, ${
      modifiedFiles.length
    } modified). Consider splitting it into multiple MRs.`,
  enableSkip: false,
  skipMessage: "Skip MR size check",
});
```

If `enableSkip` is set `true`, you can also add below content into your merge request description to control the behaviour.

```markdown
<!-- merge request description -->

# Skip

- [ ] Skip MR size check
```
