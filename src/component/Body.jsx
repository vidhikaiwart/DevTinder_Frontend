import React, { use, useEffect } from "react";
import NavBar from "./NavBar";
import { Outlet, useSearchParams } from "react-router-dom";
import Footer from "./Footer";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((store) => store.user);
  console.log;

  const fetchUser = async () => {
    if (userData) return;
    try {
      const user = await axios.get(BASE_URL + "/profile/view",
         {
        withCredentials: true,
      });
      dispatch(addUser(user.data));
    } catch (err) {
      if (err.status === 401) {
        navigate("/login");
      }
      console.error(err);
    }
  };
  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div>
      <NavBar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Body;
