import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EditUserInfo = ({ setShowModal }) => {
  const navigate = useNavigate();
  const { userId } = useParams();
  const [user, setUser] = useState({
    name: "",
    sector: "",
    agree: false,
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/sectors/${userId}`);
        const data = await response.json();

        // Set the initial state based on the fetched data
        setUser({
          name: data.username,
          sector: data.description,
          agree: data.agree,
        });
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [userId]);

  const handleChange = (e) => {
    setUser({
      ...user,
      name: e.target.value.trim(),
    });
  };

  const handleCheckboxChange = () => {
    setUser((prevUser) => ({ ...prevUser, agree: !prevUser.agree }));
  };

  const isFormValid = user.name !== "" && user.sector !== "" && user.agree;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (isFormValid) {
      try {
        await axios.post(`http://localhost:5000/sectors/update/${userId}`, {
          username: user.name,
          description: user.sector,
          agree: user.agree,
        });

        setUser({
          name: "",
          sector: "",
          agree: false,
        });

        setShowModal(false);
        setLoading(false);
        navigate("/");
      } catch (error) {
        console.error("Error saving user:", error);
        setLoading(false);
        alert(error);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="my-8 px-5 md:px-[42px]">
        <div className="flex gap-2 items-center flex-row justify-center">
          <label htmlFor="name" className="mb-1 text-sm">
            Name
          </label>
          <input
            type="text"
            required
            id="name"
            name="name"
            value={user.name}
            onChange={handleChange}
            className="w-[310px] h-12 px-4 border border-cila-slate-200 text-cila-slate-700 focus:invalid:ring-0 focus:invalid:border-cila-red-300 invalid:text-cila-red-300 font-lotar focus:outline-none focus:ring-2 focus:ring-cila-slate-700 focus:border-transparent placeholder:font-lota autofill:bg-cila-slate-50 "
            placeholder="John"
          />
        </div>
        <div className="mt-5 mb-8">
          <div className="mt-5 flex lg:flex-row flex-col gap-2 justify-center items-center">
            <label htmlFor="sectors" className="lg:items-end lg:flex">
              Sector:
            </label>
            <div>{user.sector}</div>
          </div>
        </div>

        <div className="mt-5 flex flex-row gap-2 justify-center items-center">
          <input
            type="checkbox"
            id="agree"
            checked={user.agree}
            onChange={handleCheckboxChange}
          />
          <label htmlFor="agree">Agree to terms</label>
        </div>

        <button
          type="submit"
          disabled={!isFormValid}
          className={`w-full mt-6 h-12 text-center text-white bg-cila-red-300 hover:bg-cila-red-400 md:h-14 sora-bold md:text-base ${
            isFormValid ? "" : "cursor-not-allowed opacity-50"
          }`}
        >
          Submit
          {loading && (
            <div role="status" className="inline ml-2">
              {/* Your loading spinner here */}
            </div>
          )}
        </button>
      </div>
    </form>
  );
};

export default EditUserInfo;
