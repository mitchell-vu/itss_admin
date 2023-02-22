import React, { useEffect } from "react";
import { useAPI } from "../../providers/ApiProvider";

export const Questions = () => {
  const { callApi } = useAPI();

  useEffect(() => {
    callApi("questions", {
      params: { page_num: 1, max_items_per_page: 5 },
    }).then((response) => {
      console.log(response);
    });
  }, []);

  return <div>Questions</div>;
};
