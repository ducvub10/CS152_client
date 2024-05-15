export const recreateParams = (searchParams, excludeKeys) => {
  let oldParams = "";
  Object.keys(searchParams).forEach((key) => {
    if (!excludeKeys.includes(key)) {
      oldParams += `${key}=${searchParams[key]}&`;
    }
  });

  return oldParams;
};
