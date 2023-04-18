# checkChangelog

Make sure every change is recorded in the CHANGELOG.

```javascript
// dangerfile.js
import { checkChangelog } from "danger-plugin-gitlab";

checkChangelog({
  logFile: "changelog.md",
  logType: "warn",
  logMessage: "Please add a changelog entry for your changes.",
  enableSkip: true,
  skipMessage: "This is a trival MR and no CHANGELOG changes required.",
});
```

```markdown
<!-- gitlab mr template -->

# Skip

- [x] This is a trival MR and no CHANGELOG changes required.
```
