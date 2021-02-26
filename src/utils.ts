import fs from "fs";
import Yaml from "yaml";
import { fromPairs, identity, pickBy } from "lodash";

import { Config } from "./interfaces";

export const getConfigYaml = <Stages, JobNames>({
  jobs,
  ...config
}: Config<Stages, JobNames>) => {
  const ymlContent = Yaml.stringify({
    ...config,
    ...fromPairs(jobs.map(({ name, ...job }) => [name, pickBy(job, identity)])),
  });

  return `# THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

${ymlContent}
`;
};

export const writeConfigToFile = (
  contents: string,
  outputFile: string
): void => {
  fs.writeFile(outputFile, contents, "utf8", (error) => {
    if (error) {
      console.error(error);
      process.exit(1);
    }
  });
};
