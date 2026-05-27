import { useEffect } from "react";

export const usePageMeta = (title: string) => {
  useEffect(() => {
    document.title = `${title} | MoneyMate`;
  }, [title]);
};
