# checkSelfReview

Check if the code has been reviewed by the author.

```javascript
import { checkSelfReview } from "danger-plugin-gitlab";

// default checkMessage
checkSelfReview({
  checkMessage: "Code has been reviewed by the author",
});

// custom logMessage
checkSelfReview({
  logMessage:
    "This is custom log message that will be logged when check failed",
});

// or logMessage with function type
checkSelfReview({
  logMessage: (checkMessage: string) =>
    `This is a function to get log message with param checkMessage: ${checkMessage}`,
});
```

Make use below content is inserted into the merge request description. If the code has been reviewed by the author, let the checkbox checked.

```markdown
<!-- gitlab mr template -->

# Checklist

- [ ] Code has been reviewed by the author
```
