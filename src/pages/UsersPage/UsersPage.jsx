import React, { useEffect, useState } from "react";
import { Input } from "antd";

import { useAPI } from "../../providers/ApiProvider";
import UserCard from "./UserCard";

export const UsersPage = () => {
  const { callApi } = useAPI();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    callApi("users").then((res) => {
      setUsers(res.data);
    });
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Quản lý người dùng</h1>

      <Input
        size="large"
        placeholder="Tìm người dùng"
        prefix={<i className="fa-regular fa-magnifying-glass fa-sm mr-1"></i>}
      />

      <div className="grid grid-cols-4 gap-4 mt-6">
        {users.map((user) => (
          <UserCard  key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
};
