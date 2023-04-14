# Danger Plugins For GitLab

## Install

```bash
npm install -D danger-plugin-gitlab
```

## Usage

```javascript
// ESModule
import { needChangelog } from "danger-plugin-gitlab";

// or CommonJS
const { needChangelog } = require("danger-plugin-gitlab");

// use needChangelog with default options
needChangelog();

// just equal to
needChangelog({
  filename: "changelog.md",
  logType: "warn",
  checkMessage: "This is a trival MR and no CHANGELOG changes required.",
  logMessage: "Please add a changelog entry for your changes.",
});
```

## DONE

- [x] needChangelog

## TODO

- [ ] ...
