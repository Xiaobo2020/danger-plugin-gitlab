# checkIssueTicket

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
