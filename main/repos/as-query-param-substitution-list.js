import asCommaSeparatedList from "../utils/as-comma-separated-list.js";

export default (arr) => asCommaSeparatedList(arr.map((_, i) => `$${i + 1}`));
