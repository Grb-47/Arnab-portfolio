import { useState, useEffect } from "react";

export function useData<T>(apiPath: string, fallback: T): T {
  const [data, setData] = useState<T>(fallback);

  useEffect(() => {
    fetch(apiPath)
      .then((r) => r.json())
      .then((d) => setData(d))
      .catch(() => {});
  }, [apiPath]);

  return data;
}
