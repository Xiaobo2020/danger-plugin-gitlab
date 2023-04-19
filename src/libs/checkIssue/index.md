# checkIssue

Check if an ISSUE ticket exists in MR title or description.

```javascript
import { checkIssue } from "danger-plugin-gitlab";

checkIssue({
  logType: "warn",
  // suggest to use default log message
  // logMessage: "Custom log message",
  location: "title",
  key: "JIRA", // or ["AAA", "BBB"]
});
```
