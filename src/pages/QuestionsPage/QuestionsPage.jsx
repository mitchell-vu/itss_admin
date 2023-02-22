import React, { useEffect, useState } from "react";
import { Avatar, Card, Pagination, Tag } from "antd";

import { useAPI } from "../../providers/ApiProvider";
import { QuestionCard } from "./QuestionCard";

export const QuestionsPage = () => {
  const { callApi } = useAPI();
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    callApi("questions", {
      params: { page_num: 1, max_items_per_page: 5 },
    }).then((response) => {
      setQuestions(response.data);
    });
  }, []);

  const onShowSizeChange = (current, pageSize) => {
    console.log(current, pageSize);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Quản lý câu hỏi</h1>

      <div className="grid grid-cols-1 gap-4">
        {questions.map((question) => (
          <QuestionCard key={question.id} question={question} />
        ))}
      </div>

      <Pagination
        showSizeChanger
        onShowSizeChange={onShowSizeChange}
        defaultCurrent={1}
        total={30}
        disabled={true}
        className="mt-5"
      />
    </div>
  );
};
