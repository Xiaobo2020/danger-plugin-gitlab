# isExternal

Check if the MR is created from an external project.

```javascript
import { isExternal, getLogger } from "danger-plugin-gitlab/dist/utils";

if (isExternal()) {
  const warnLogger = getLogger("warn");
  warnLogger("This MR is created from an external project.");
}
```
