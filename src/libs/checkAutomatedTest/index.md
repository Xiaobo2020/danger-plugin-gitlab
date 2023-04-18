# checkAutomatedTest

Check if source files have been modified, but not test files.

```javascript
import { checkAutomatedTest } from "danger-plugin-gitlab";

checkAutomatedTest();

checkAutomatedTest({
  sourceFileMath: /packages\/(webapp|server)\/.*.(?<!test.)(js|ts|jsx|tsx)$/,
  testFileMath: /packages\/(webapp|server)\/.*test.*(js|ts|jsx|tsx)$/,
});
```

If you want to explicitly state that the tests have been updated, then you can set `enableCheck` to `true`.

```javascript
checkAutomatedTest({
  enableCheck: true,
  checkMessage: "Automated tests added/updated",
});
```

And insert below content into your MR description.

```markdown
<!-- gitlab mr template -->

# Checklist

- [x] Automated tests added/updated
```
