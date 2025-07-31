import debug from "debug";
import asColonDelimittedString from "./as-colon-delimitted-string.js";

const appNameBaseParts = ["api.authentic-intelligence.quest"];

export default (moduleNameParts) =>
  debug(
    asColonDelimittedString([...appNameBaseParts, ...(moduleNameParts ?? [])])
  );
