# checkSelfReview

Hard fail if author has not reviewed their code.

```javascript
// dangerfile.{js|ts}
import { checkSelfReview } from "danger-plugin-gitlab";

checkSelfReview();
```

Make use below content is inserted into the merge request description.

```markdown
<!-- gitlab mr template -->

# Checklist

- [ ] Code has been reviewed by the author
```

## Options

| prop         | type                                           | required | default                                                 | description                                               |
| ------------ | ---------------------------------------------- | -------- | ------------------------------------------------------- | --------------------------------------------------------- |
| logType      | `"fail"`\|`"warn"`\|`"message"`\|`"markdown"`  | `false`  | `"fail"`                                                | The type of log function                                  |
| checkMessage | `string`                                       | `false`  | `"Code has been reviewed by the author"`                | The target message used in the description to be checked  |
| logMessage   | `string`\|`((checkMessage: string) => string)` | `false`  | `"${checkMessage} is unchecked in the MR description."` | The log message that will be printed when the check fails |
