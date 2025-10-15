import axios from 'axios'
import React, {  useEffect } from 'react'
import { addFeed } from '../utils/feedSlice'
import { BASE_URL } from '../utils/constants';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import UserCard from './UserCard.jsx'

const Feed = () => {

const feed = useSelector((state) => state.feed);
const dispatch = useDispatch();

  const getFeed = async()=>{
 if(feed) return;
 try{
      const res = await axios.get(BASE_URL + "/feed",{
        withCredentials:true,
      });
      console.log(res.data);
      dispatch(addFeed(res.data));
 }catch(err){
      console.log(err);
 }
   
}

useEffect(()=>{
  getFeed();
},[]);

  return (
    feed &&(
    <div className='flex justify-center my-10'>
    <UserCard  user={feed[1]}/>
    </div>
    )
  )
}

export default Feed
