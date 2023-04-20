# checkManuallyTested

Hard fail if author has not manually tested their changes when source files have been modified

```javascript
// dangerfile.{js|ts}
import { checkManuallyTested } from "danger-plugin-gitlab";

checkManuallyTested();
```

Make use below content is inserted into the merge request description.

```markdown
<!-- gitlab MR template -->

# Checklist

- [ ] Manually tested in a web browser
```

## Options

| prop            | type                                           | required | default                                                                                      | description                                               |
| --------------- | ---------------------------------------------- | -------- | -------------------------------------------------------------------------------------------- | --------------------------------------------------------- |
| logType         | `"fail"`\|`"warn"`\|`"message"`\|`"markdown"`  | `false`  | `"fail"`                                                                                     | The type of log function                                  |
| checkMessage    | `string`                                       | `false`  | `"Manually tested in a web browser"`                                                         | The target message used in the description to be checked  |
| logMessage      | `string`\|`((checkMessage: string) => string)` | `false`  | `"${checkMessage} is unchecked in the MR description when source files have been modified."` | The log message that will be printed when the check fails |
| sourceFileMatch | `RegExp`                                       | `false`  | `.js` or `.jsx`or `.ts` or `.tsx` below `src/` exclude `*.test.*`                            | The matcher for changed source files                      |
