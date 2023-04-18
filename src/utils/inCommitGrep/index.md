# inCommitGrep

Confirm if the pattern is included in the changed files.

```javascript
import { inCommitGrep } from "danger-plugin-gitlab/dist/utils";

const changedFromServer = inCommitGrep(/packages\/server\/.*/);
const changedFromWebapp = inCommitGrep(/packages\/webapp\/.*/);
```
