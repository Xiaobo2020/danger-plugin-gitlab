# checkChangelog

Make sure every change is recorded in the CHANGELOG.

```javascript
// dangerfile.js
import { checkChangelog } from "danger-plugin-gitlab";

checkChangelog({
  logFile: "changelog.md",
  logType: "warn",
  logMessage: "Please add a changelog entry for your changes.",
});
```

If you want to skip the check for CHANGELOG, you can set `enableSkip` to be `true`

```javascript
checkChangelog({
  enableSkip: true,
  skipMessage: "This is a trival MR and no CHANGELOG changes required.",
});
```

Then insert below content into your MR description.

```markdown
<!-- gitlab mr template -->

# Skip

- [x] This is a trival MR and no CHANGELOG changes required.
```
