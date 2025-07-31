import asCommaDelimittedString from "../../utils/as-comma-delimitted-string.js";

export default (arr) => asCommaDelimittedString(arr.map((_, i) => `$${i + 1}`));
