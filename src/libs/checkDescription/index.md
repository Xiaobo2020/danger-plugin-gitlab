# checkDescription

Make sure each merge request has a detailed description.

```javascript
import { checkDescription } from "danger-plugin-gitlab";

checkDescription({
  logType: "message",
  minLength: 50,
  logMessage: "Please provide a summary in the merge request description.",
});
```
