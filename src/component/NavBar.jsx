import React, { use } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import profile from "./Profile";

const NavBar = () => {

  const user = useSelector((store) => store.user);
  console.log(user);


  return (
    <div className="navbar bg-base-300 shadow-sm">
      <div className="flex-1">
        <Link to= "/" className="btn btn-ghost text-xl">Dev_Tinder</Link>
      </div>

      {user &&(
      <div className="flex gap-2">
       <div className="flex items-center gap-2" ><p> Welcome , {user.firstName}</p></div>
        <div className="dropdown dropdown-end mx-5 ">
          
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS Navbar component"
                src={user?.photoUrl || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"}
              />
            </div>
          </div>
          <ul
            tabIndex="-1"
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            <li>
              <Link to="/profile" className="justify-between">
                Profile
                <span className="badge bg-base-100">New</span>
              </Link>
            </li>
            <li>
              <a>Settings</a>
            </li>
            <li>
              <a>Logout</a>
            </li>
          </ul>
        </div>
      </div>)}
    </div>
  );
};

export default NavBar;
