import { redirect } from "next/navigation";

// const statusExceptions = new Set([401]);

async function fetchData(path, option = {}) {
  const url =
    process.env.MODE === "DEV"
      ? process.env.DEV_SERVER_URL
      : process.env.PROD_SERVER_URL;
  const res = await fetch(url + path, option);
  if (res.status === 401) {
    router.replace(`/login`);
  } else if (res.status >= 400 && res.status < 500) {
    redirect(`/client-error?code=${res.status}`);
  } else if (res.status >= 500 && res.status < 600) {
    redirect(`/server-error?code=${res.status}`);
  }

  return await res.json();
}

export default fetchData;
