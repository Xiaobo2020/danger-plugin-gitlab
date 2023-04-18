# getChangedFiles

Since the methods and variables in `danger` will be mounted to global variables during execution. Sometimes it will be treated as an error by Typescript. Here, a unified method is used to export the required internal variables of danger, and the type definitions are handled uniformly here.

If we want to use the logger function supplied by `danger`, we can get from `getLogger`.

```javascript
import { getDangerModule } from "danger-plugin-gitlab/dist/utils";

// equal to `const { git, github, gitlab } = danger;`
const { git, gitlab, github } = getDanger();
```
