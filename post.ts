import { exec } from "@actions/exec"
import * as core from "@actions/core"
import {validateSubscription} from "./subscription";

// GitHub Actions does not support shell `post` actions and thus requires a JS wrapper.
try {
  await validateSubscription()
  await exec("/bin/bash", [
    new URL("./post.sh", import.meta.url).pathname,
    core.getInput("debug")
  ])
} catch (error) {
  if (!(error instanceof Error)) throw error

  core.setFailed(error.message)
}
