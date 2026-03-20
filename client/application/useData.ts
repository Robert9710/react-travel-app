import { useEffect, useState } from "react";

interface RequestObj {
  url: string;
  options?: object;
}

export default function useData<T>(requestObj: RequestObj) {
  const [data, setData] = useState<T | null>(null);
  useEffect(() => {
    async function fetchData() {
      const response = await fetch(requestObj.url, requestObj.options);
      setData(await response.json());
    }
    fetchData();
  }, [requestObj.url, requestObj.options]);
  return data;
}

// async function fetchData<T>(requestObj: RequestObj): Promise<T> {
//   const response = await fetch(requestObj.url, requestObj.options);
//   return await response.json();
// }
