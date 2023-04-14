# Danger Plugins For GitLab

## Install

```bash
npm install -D danger-plugin-gitlab
```

## Usage

```javascript
// ESModule
import { enforceChangelogs } from "danger-plugin-gitlab";

// or CommonJS
const { enforceChangelogs } = require("danger-plugin-gitlab");

// use enforceChangelogs with default options
enforceChangelogs();

// just equal to
enforceChangelogs({
  filename: "changelog.md",
  logType: "warn",
  checkMessage: "This is a trival MR and no CHANGELOG changes required.",
  logMessage: "Please add a changelog entry for your changes.",
});
```

## Features

### enforceChangelogs

Make sure every change is recorded in the changelog.

```javascript
enforceChangelogs({
  filename: "changelog.md",
  logType: "warn",
  checkMessage: "This is a trival MR and no CHANGELOG changes required.",
  logMessage: "Please add a changelog entry for your changes.",
});
```

### detailedDescription

Make sure each merge request has a detailed description.

```javascript
detailedDescription({
  logType: "message",
  minLength: 5,
  logMessage: "Please provide a summary in the pull request description.",
});
```

### lockfile

Make sure the `package-lock.json` (or `yarn.lock`) is up to date when changes were made to `package.json`.

```javascript
lockfile({
  logType: "message",
  lockfilename: "package-lock.json",
  logMessage: "Changes were mad to package.json, but not to package-lock.json.",
});
```
