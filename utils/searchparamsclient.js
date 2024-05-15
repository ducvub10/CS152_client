"use client";

export const recreateParams = (searchParams, excludeKeys) => {
  let oldParams = "";
  searchParams.forEach((value, key) => {
    if (!excludeKeys.includes(key)) {
      oldParams += `${key}=${value}&`;
    }
  });

  return oldParams;
};
