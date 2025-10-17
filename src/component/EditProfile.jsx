import React, { use } from 'react'
import { useState } from 'react';
import UserCard from './UserCard';
import { BASE_URL } from '../utils/constants';
import axios from 'axios';
import { useEffect } from 'react';  
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';


const EditProfile = ({user}) => {

    const [firstName, setFirstname] = useState(user.firstName);
    const [lastName, setLastName] = useState(user.lastName);
    const [photoUrl, setPhotourl] = useState(user.photoUrl);
    const [age,setAge] = useState(user.age || "");
    const [gender,setGender] = useState(user.gender || "");
    const [about,setAbout] = useState(user.about);
    const [error,setError] = useState(null);
    const [showToast,setShowToast] = useState(false);
    const dispatch = useDispatch();

    const saveProfile= async ()=>{
        try{
          const res = await axios.patch(BASE_URL + "/profile/edit",
            { firstName,lastName,photoUrl,age,gender,about } ,
            {withCredentials:true},
          )
          dispatch(addUser(res?.data?.data));  
          setShowToast(true);

          setTimeout(()=>{
            setShowToast(false);
            clearInterval(i);
          },3000);
        }catch(err){
           setError(err.responce.data  || "Error while saving profile" );
        }
    };

  return (
    <>
    <div className='flex gap-x-5 justify-center'>
    <div className="flex justify-center items-center py-20 ">
      <div className="card w-96 bg-white shadow-2xl rounded-2xl backdrop-blur-md border border-white/30">
        <div className="card-body space-y-5">
          <h2 className="card-title text-center text-3xl text-transparent bg-clip-text bg-base-300">
            Edit Profile
          </h2>
          <div className="space-y-4">
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
                onChange={(e) => setFirstname(e.target.value)}
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
                className="input input-bordered w-full rounded-xl "
                onChange={(e) => setLastname(e.target.value)}
              />
            </label>
           
           <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text text-gray-700 font-semibold">
                    PhotoUrl
                </span>
              </div>
              <input
                type="text"
                value={photoUrl}
                placeholder="Enter your photoUrl"
                className="input input-bordered w-full rounded-xl "
                onChange={(e) => setPhotourl(e.target.value)}
              />
            </label>
            
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text text-gray-700 font-semibold">
                    Age
                </span>
              </div>
              <input
                type="text"
                value={age}
                placeholder="Enter your age"
                className="input input-bordered w-full rounded-xl "
                onChange={(e) => setAge(e.target.value)}
              />
            </label>
            
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text text-gray-700 font-semibold">
                    Gender
                </span>
              </div>
              <input
                type="text"
                value={gender}
                placeholder="enter your gender"
                className="input input-bordered w-full rounded-xl "
                onChange={(e) => setGender(e.target.value)}
              />
            </label>
            
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text text-gray-700 font-semibold">
                    About
                </span>
              </div>
              <input
                type="text"
                value={about}
                placeholder="about yourself"
                className="input input-bordered w-full rounded-xl "
                onChange={(e) => setAbout(e.target.value)}
              />
            </label>
          </div>
 
          <div className="card-actions justify-center mt-4">
            <button className="btn w-full bg-blue-900"
             onClick={saveProfile}>
              SAVE PROFILE
            </button>
          </div>
        </div>
      </div>
    </div>
    <div className='flex justify-center items-center py-20  '>
  <UserCard user ={{ firstName,lastName,photoUrl,age,gender,about }} />        
    </div>
    </div>

    {showToast && (
      <div className="toast toast-top toast-center">
        <div className="alert alert-success">
          <span>  Profile save successfully.</span>
        </div>
      </div>
    )}

    </>

  )
}

export default EditProfile
