export const isJson = (str: string) => {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
};

export const substringAfter = (str: string, toFind: string) => {
  const index = str.indexOf(toFind);
  return index == -1 ? "" : str.substring(index + toFind.length);
};

export const substringBefore = (str: string, toFind: string) => {
  const index = str.indexOf(toFind);
  return index == -1 ? "" : str.substring(0, index);
};
