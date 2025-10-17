import React, { use, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice"; // Import the action to add user data
import { useNavigate } from "react-router-dom"; 
import { BASE_URL } from "../utils/constants";
import Feed from "./Feed";

const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isLoginForm, setIsLoginForm] = useState(false);
  const [error,setError] = useState("");
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
   
   navigate("/Feed");
    } catch (err) {
      setError(err?.response?.data || err.message);
  
    }
  };
  
  const handleSignUp = async () => {
    
    try {
      const res = await axios.post(
        BASE_URL + "/signup",

        { firstName, lastName ,emailId, password },
        { withCredentials: true }
      );
      console.log(res.data);
      dispatch(addUser(res.data.data)); // Dispatch the action to add user data to Redux store
      // Handle successful login (e.g., redirect to profile page)
   
   navigate("/profile");
    } catch (err) {
      setError(err?.response?.data || err.message);
  
    }
  };


  return (
    <div className="flex justify-center items-center py-20 ">
      <div className="card w-96 bg-white shadow-2xl rounded-2xl backdrop-blur-md border border-white/30">
        <div className="card-body space-y-5">
          <h2 className="card-title justify-center  text-3xl font-extrabold text-transparent bg-clip-text bg-base-300">
                       {isLoginForm ? "LOGIN" : "SIGNUP"}

          </h2>
          <div className="space-y-4">
         {!isLoginForm &&(
           <> 
              <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text text-gray-700 font-semibold">
                  First Name
                </span>
              </div>
              <input
                type="text"
                value={firstName}
                placeholder="Enter your first name"
                className="input input-bordered w-full rounded-xl"
                onChange={(e) => setFirstName(e.target.value)}
              />
            </label>

            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text text-gray-700 font-semibold">
                  Last Name
                </span>
              </div>
              <input
                type="text"
                value={lastName}
                placeholder="Enter your last name"
                className="input input-bordered w-full rounded-xl"
                onChange={(e) => setLastName(e.target.value)}
              />
            </label>
</>
)}

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

           <p className="text-red-500  justify-center  cursor-pointer">{error}</p>
            <button className="btn w-full bg-blue-900" onClick={isLoginForm ? handleLogin : handleSignUp  }>
             {isLoginForm ? "Login" : "Sign Up"}
            </button>
          </div>
          <p className="text-base-200 " onClick={()=>{setIsLoginForm((value) => !value)}}>{isLoginForm ? "Don't have an account?" : "Already have an account?"} 
             <span className="text-blue-500 cursor-pointer" onClick={() => setIsLoginForm(!isLoginForm)}>{isLoginForm ? " Sign Up" : " Login"}</span></p>
        </div>
      </div>
    </div>
  );
};

export default Login;
