import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import EnrollModal from "./EnrollModal";
import api from "../api/api";

function UsersInfo() {
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${api}/sectors`);
        const data = await response.json();

        setUsers(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  console.log("hjgfv", users);
  return (
    <div className="w-full flex justify-center">
      <div className="max-auto h-screen p-10 flex justify-center lg:max-w-[660px] w-full flex-col items-center">
        <h1 className="text-3xl font-bold mb-5 ">User's Information</h1>
        {/* <div className="h-[250px] w-[500px] p-2 grid  md:grid-cols-2 gap-3 mt-3 overflow-y-scroll"> */}
        <div className="h-[450px] gap-[30px] p-2 grid grid-cols-1 lg:grid-cols-2  mt-3 overflow-y-scroll">
          {users.map((user) => (
            <Link
              key={user._id}
              to={`/user/${user._id || user.id}`}
              className="container rounded border   mt-5 bg-slate-200 hover:bg-slate-300 cursor-pointer w-[250px] h-[100px] flex  pl-5 pr-5 pt-2 flex-col"
            >
              {console.log("kjihugycf", user._id)}
              <div className="text-2xl font-normal ">{user.username}</div>
              <div>{user.description}</div>
            </Link>
          ))}
        </div>

        <button
          className="bg-blue-500 w-full hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-[50px]"
          onClick={() => setShowModal(true)}
        >
          Add User
        </button>
        {/* <h1>User Registration Form</h1>
    <UserForm /> */}
        <EnrollModal
          showModal={showModal}
          setShowModal={setShowModal}
          users={users}
          setUsers={setUsers}
        />
      </div>
    </div>
  );
}

export default UsersInfo;
