# addLabel

Add labels to MR.

```javascript
import { addLabel } from "danger-plugin-gitlab";

addLabel([
  { match: /packages\/server\/.*/, name: "server" },
  { match: /packages\/webapp\/.*/, name: "webapp" },
]);
```

Make sure the labels were created in GitLab with different colors.
