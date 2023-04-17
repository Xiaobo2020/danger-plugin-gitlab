# detailedDescription

Make sure each merge request has a detailed description.

```javascript
import { detailedDescription } from "danger-plugin-gitlab";

detailedDescription({
  logType: "message",
  minLength: 5,
  logMessage: "Please provide a summary in the pull request description.",
});
```
