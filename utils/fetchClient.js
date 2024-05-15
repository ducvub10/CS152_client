"use client";

// const pathExceptions = new Set(['profile', 'write']);

async function fetchData(path, router, pathname, option = {}) {
  const url =
    process.env.NEXT_PUBLIC_MODE === "DEV"
      ? process.env.NEXT_PUBLIC_DEV_SERVER_URL
      : process.env.NEXT_PUBLIC_PROD_SERVER_URL;
  const res = await fetch(url + path, option);

  if (res.status === 401) {
    if (pathname.includes("write") || pathname.includes("profile")) {
      router.replace(`/login`);
    } else {
      return await res.json();
    }
  } else if (res.status >= 400 && res.status < 500) {
    router.replace(`/client-error?code=${res.status}`);
  } else if (res.status >= 500 && res.status < 600) {
    router.replace(`/server-error?code=${res.status}`);
  } else {
    return await res.json();
  }
}

export default fetchData;
