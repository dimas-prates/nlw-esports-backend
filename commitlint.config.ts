import type { UserConfig } from "@commitlint/types";

const Configuration: UserConfig = {
  /*
   * Resolve and load @commitlint/config-conventional from node_modules.
   * Referenced packages must be installed
   */
  extends: ["gitmoji"],
  /*
  * Any rules defined here will override rules from @commitlint/config-conventional
  */
  rules: {
    "header-max-length": [0, "always", 100]
  },
};

module.exports = Configuration;