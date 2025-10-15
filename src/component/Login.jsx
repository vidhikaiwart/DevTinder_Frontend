import React, { use, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice"; // Import the action to add user data
import { useNavigate } from "react-router-dom"; 
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate(); 

  const handleLogin = async () => {
    
    try {
      const res = await axios.post(
        BASE_URL + "/login",

        { emailId, password },
        { withCredentials: true }
      );
      console.log(res.data);
      dispatch(addUser(res.data)); // Dispatch the action to add user data to Redux store
      // Handle successful login (e.g., redirect to profile page)
   
   navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex justify-center items-center py-20 ">
      <div className="card w-96 bg-white shadow-2xl rounded-2xl backdrop-blur-md border border-white/30">
        <div className="card-body space-y-5">
          <h2 className="card-title text-center text-3xl font-extrabold text-transparent bg-clip-text bg-base-300">
            LOGIN
          </h2>
          <div className="space-y-4">
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text text-gray-700 font-semibold">
                  Email ID
                </span>
              </div>
              <input
                type="email"
                value={emailId}
                placeholder="Enter your email"
                className="input input-bordered w-full rounded-xl"
                onChange={(e) => setEmailId(e.target.value)}
              />
            </label>

            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text text-gray-700 font-semibold">
                  Password
                </span>
              </div>
              <input
                type="password"
                value={password}
                placeholder="Enter your password"
                className="input input-bordered w-full rounded-xl "
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
          </div>

          <div className="card-actions justify-center mt-4">
            <button className="btn w-full bg-blue-900" onClick={handleLogin}>
              LOGIN
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
