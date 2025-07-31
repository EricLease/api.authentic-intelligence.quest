const intTruthyValues = [1];
const stringTruthyValues = ["true", "t"];

export default (data, parseStrings = true) => {
  if (data === true || data === false) {
    return data;
  }

  const asNum = Number.parseInt(data, 10);

  if (!isNaN(asNum)) {
    return intTruthyValues.indexOf(asNum) > -1;
  }

  return parseStrings && stringTruthyValues.indexOf(data?.toLowerCase?.()) > -1;
};
