import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAPI } from "../../providers/ApiProvider";

export const QuestionPage = () => {
  const { id: questionId } = useParams();
  const [question, setQuestion] = useState(null);
  const { callApi } = useAPI();

  useEffect(() => {
    callApi("question", { params: { pk: questionId } }).then((response) => {
      console.log(response.data);
    });
  }, [questionId]);
  return <div>QuestionPage</div>;
};
