import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";

import { Edit2, Trash } from "iconsax-react";
import EnrollModal from "./EnrollModal";
import EditModal from "./EditModal";
function EditUser() {
  const [users, setUsers] = useState({});
  const [showModal, setShowModal] = useState(false);
  const { userId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/sectors/${userId}`);
        const data = await response.json();

        setUsers(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [userId]);

  const handleDelete = async (userId) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/sectors/${userId}`
      );
      //   const data = await response.json();

      console.log("jhgfcv", response.data);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="w-full flex justify-center">
      <div className="max-auto h-screen p-10 flex justify-center lg:max-w-[660px] w-full flex-col items-center">
        <h1 className="text-3xl font-bold mb-5 ">User's Detail</h1>
        {/* <div className="h-[250px] w-[500px] p-2 grid  md:grid-cols-2 gap-3 mt-3 overflow-y-scroll"> */}
        <div className="h-[450px] gap-[30px] p-2   mt-3 ">
          <div className="container rounded border   mt-5 bg-slate-200   gap-[20px] h-[100px] flex  pl-5 pr-5 pt-2 flex-row items-center">
            <div>
              <div className="text-2xl font-normal ">{users.username}</div>
              <div>{users.description}</div>
            </div>

            <Edit2
              size="20"
              color="#FF8A65"
              className="cursor-pointer"
              onClick={() => setShowModal(true)}
            />
            <Trash
              size="20"
              color="#FF8A65"
              className="cursor-pointer"
              onClick={() => handleDelete(users._id)}
            />
          </div>
        </div>
      </div>

      <EditModal
        showModal={showModal}
        setShowModal={setShowModal}
        users={users}
        setUsers={setUsers}
      />
    </div>
  );
}

export default EditUser;
