# checkChangelog

Make sure every change is recorded in the CHANGELOG.

```javascript
import { checkChangelog } from "danger-plugin-gitlab";

checkChangelog({
  filename: "changelog.md",
  logType: "warn",
  checkMessage: "This is a trival MR and no CHANGELOG changes required.",
  logMessage: "Please add a changelog entry for your changes.",
});
```
