import { useEffect, useState } from "react";

interface RequestObj {
  url: string;
  options?: object;
}

export default function useData(requestObj: RequestObj) {
  const [data, setData] = useState(null);
  useEffect(() => {
    fetch(requestObj.url, requestObj.options)
      .then((response) => response.json())
      .then((data) => setData(data));
  }, [requestObj.url]);
  return data;
}
