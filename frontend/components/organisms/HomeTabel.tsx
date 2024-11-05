import React from "react";

interface User {
  nickname: string;
  signup_timestamp: string;
  num_time_login: number;
  login_end_timestamp: string;
}

interface UserLoginTableProps {
  users: User[];
}

const UserLoginTable: React.FC<UserLoginTableProps> = ({ users }) => {
  return (
    <div className="overflow-x-auto">
      <h1 className="text-2xl font-bold mb-4">User Login Data</h1>
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Username</th>
            <th className="py-2 px-4 border-b">Signup At</th>
            <th className="py-2 px-4 border-b">Num Times Login</th>
            <th className="py-2 px-4 border-b">Logout At</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index} className="hover:bg-gray-100">
              <td className="py-2 px-4 border-b">{user.nickname}</td>
              <td className="py-2 px-4 border-b">
                {user.signup_timestamp
                  ? new Date(user.signup_timestamp).toLocaleString()
                  : "-"}
              </td>
              <td className="py-2 px-4 border-b">{user.num_time_login || 0}</td>
              <td className="py-2 px-4 border-b">
                {user.signup_timestamp
                  ? new Date(user.login_end_timestamp).toLocaleString()
                  : "-"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserLoginTable;
