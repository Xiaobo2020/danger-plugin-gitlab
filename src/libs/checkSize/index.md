# checkSize

Encourage smaller merge request.

```javascript
import { checkSize } from "danger-plugin-gitlab";

checkSize();

checkSize({
  logType: "fail",
  // suggestion use default log message
  // logMessage: "Your log message",
  maxSize: 20,
});
```

If you want to skip the check for MR size, you can set `enableSkip` to be `true`

```javascript
checkSize({
  enableSkip: true,
  skipMessage: "Skip MR size check",
});
```

Then insert below content into your MR description.

```markdown
<!-- gitlab mr template -->

# Skip

- [x] Skip MR size check
```
