import React, { useEffect, useState } from "react";
import { BiSolidEdit } from 'react-icons/bi';
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateUsers } from "../redux/apislice/userDetailsSlice";
import styles from "./css/updateeuser.module.css";

const UpdateUser = () => {
   const { id } = useParams();
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const [updateData, setUpdateData] = useState();
   const users = useSelector((state) => state.user.users);

   useEffect(() => {
      if (id) {
         const singleUser = users.filter((ele) => ele.id === id);
         setUpdateData(singleUser[0]);
      }
   }, [id, users]);

   const newData = (e) => {
      setUpdateData({...updateData, [e.target.name] : e.target.value})
   }

   const handelUpdate = (e) => {
      e.preventDefault();
      dispatch(updateUsers(updateData));
      navigate("/");
   }

   return (
      <div className={styles.inputbox}>
         <h2 className="text-white text-2xl absolute -mt-10 uppercase flex items-center">Update User <BiSolidEdit /></h2>
         <form onSubmit={handelUpdate}>
            <input
               type="text"
               placeholder="Name"
               name="name"
               value={updateData && updateData.name}
               onChange={newData}
               required
            />
            <input
               type="text"
               placeholder="Email"
               name="email"
               value={updateData && updateData.email}
               onChange={newData}
               required
            />
            <input
               type="text"
               placeholder="Age"
               name="age"
               value={updateData && updateData.age}
               onChange={newData}
               required
            />
            <div className="flex items-center">
               <div className="mr-5">
                  <input
                     type="radio"
                     name="gender"
                     value="Male"
                     checked={updateData && updateData.gender === "Male"}
                     onChange={newData}
                     required
                  />
                  <span className="text-white -ml-1">Male</span>
               </div>
               <div className="mr-5">
                  <input
                     type="radio"
                     name="gender"
                     value="Female"
                     checked={updateData && updateData.gender === "Female"}
                     onChange={newData}
                  />
                  <span className="text-white -ml-1">Female</span>
               </div>
            </div>
            <button className={styles.addbtn} type="submit">Update</button>
         </form>
      </div>
   )
}

export default UpdateUser