import React, { useState } from "react";
import { Avatar, Button, Card } from "antd";
import { useAPI } from "../../providers/ApiProvider";

const UserCard = ({ user }) => {
  const { callApi } = useAPI();
  const [isLoading, setIsLoading] = useState(false);

  const banUserHandler = async (userId) => {
    setIsLoading(true);
    try {
      const res = await callApi("banUser", { params: { pk: userId } });
    } catch (e) {}
    setIsLoading(false);
  };

  const unbanUserHandler = async (userId) => {
    setIsLoading(true);
    try {
      const res = await callApi("banUser", { params: { pk: userId } });
    } catch (e) {}
    setIsLoading(false);
  };

  return (
    <Card className="p-2">
      <div className="flex flex-col justify-center items-center">
        <Avatar src={user.picture} alt={user.name} size={100} />
        <div className="text-xl font-bold mt-4">{user.name}</div>
        <div className="text-gray-400">{user.email}</div>

        {user.status === 1 ? (
          <Button
            danger
            disabled={isLoading}
            onClick={() => banUserHandler(user.id)}
            className="w-full mt-5"
          >
            Chặn người dùng
          </Button>
        ) : (
          <Button
            disabled={isLoading}
            onClick={() => unbanUserHandler(user.id)}
            className="w-full mt-5"
          >
            Bỏ chặn người dùng
          </Button>
        )}
      </div>
    </Card>
  );
};

export default UserCard;
