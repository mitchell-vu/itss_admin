import React from "react";
import { Avatar, Card, Tag } from "antd";
import { Link } from "react-router-dom";

export const QuestionCard = ({ question }) => {
  return (
    <Link to={`/admin/questions/${question.id}`}>
      <Card className="hover:border-gray-400 transition">
        <div className="flex flex-row gap-10 items-center">
          <div className="text-gray-500">
            <div className="mb-3">
              <i className="fa-duotone fa-calendar fa-lg mr-3"></i>
              {new Date(question.createdAt).toLocaleString("en-US", {
                dateStyle: "short",
                timeStyle: "short",
              })}
            </div>
            <div className="flex flex-row gap-4 items-center">
              <div className="flex flex-row gap-4 items-center">
                <i className="fa-duotone fa-eye fa-lg"></i>
                <span className="font-medium">{question.view ?? 0}</span>
              </div>
              <div className="flex flex-row gap-4 items-center">
                <i className="fa-duotone fa-message-quote fa-lg"></i>
                <span className="font-medium">
                  {question.comments?.length ?? 0}
                </span>
              </div>
              <div className="flex flex-row gap-4 items-center">
                <i className="fa-duotone fa-thumbs-up fa-lg"></i>
                <span className="font-medium">
                  {question.likes?.length ?? 0}
                </span>
              </div>
            </div>
          </div>

          <div>
            <div className="flex flex-row items-center gap-2">
              <Avatar src={question.author.picture} />
              <div>{question.author.name}</div>
            </div>
            <div className="font-semibold text-lg my-3">{question.title}</div>

            <div className="flex flex-row mt-4">
              {question.topic.map((tp, index) => (
                <Tag
                  key={`tag-${index}`}
                  color="default"
                  className="px-2 py-1 rounded-lg hover:bg-gray-200"
                >
                  {tp}
                </Tag>
              ))}
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
};
