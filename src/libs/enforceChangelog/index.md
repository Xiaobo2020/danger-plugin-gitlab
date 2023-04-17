# enforceChangelog

Make sure every change is recorded in the changelog.

```javascript
import { enforceChangelog } from "danger-plugin-gitlab";

enforceChangelog({
  filename: "changelog.md",
  logType: "warn",
  checkMessage: "This is a trival MR and no CHANGELOG changes required.",
  logMessage: "Please add a changelog entry for your changes.",
});
```
