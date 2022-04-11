import { Octokit } from "@octokit/rest";
import { LS_KEY_GITHUB_PERSONAL_ACCESS_TOKEN } from "./constants";

/**
 * Why using "@octokit/rest" instead of "octokit"?
 *
 * By enabling @octokit/rest, we dont need to wait 3 retry after 409 conflict error.
 *
 * ```js
 * import { Octokit } from "octokit";
 * let octokit = new Octokit({
 *   auth: localStorage.getItem(LS_KEY_GITHUB_PERSONAL_ACCESS_TOKEN),
 * });
 *```
 */

const octokit = new Octokit({
  auth: localStorage.getItem(LS_KEY_GITHUB_PERSONAL_ACCESS_TOKEN),
});

export default octokit;
