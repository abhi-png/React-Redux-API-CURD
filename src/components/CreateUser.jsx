import React, { useState } from "react";
import { IoIosAddCircle } from 'react-icons/io';
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createUsers } from "../redux/apislice/userDetailsSlice";
import styles from "./css/createuser.module.css";

const CreateUser = () => {
   const [ formData, setFormData ] = useState({});
   const navigate = useNavigate();
   const dispatch = useDispatch();

   const handleInputChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
   }

   const handelSubmit = (e) => {
      e.preventDefault();
      dispatch(createUsers(formData));
      navigate("/");
   }

   return (
      <div className={styles.inputbox}>
         <h2 className="text-white text-2xl absolute -mt-10 uppercase flex items-center">Create user <IoIosAddCircle /></h2>
         <form onSubmit={handelSubmit}>
            <input
               type="text"
               placeholder="Name"
               name="name"
               onChange={handleInputChange}
               required
            />
            <input
               type="text"
               placeholder="Email"
               name="email"
               onChange={handleInputChange}
               required
            />
            <input
               type="text"
               placeholder="Age"
               name="age"
               onChange={handleInputChange}
               required
            />
            <div className="flex items-center">
               <div className="mr-5">
                  <input type="radio" name="gender" value="Male" onChange={handleInputChange} required />
                  <span className="text-white -ml-1">Male</span>
               </div>
               <div className="mr-5">
                  <input type="radio" name="gender" value="Female" onChange={handleInputChange} />
                  <span className="text-white -ml-1">Female</span>
               </div>
            </div>
            <button className={styles.addbtn} type="submit">Submit</button>
         </form>
      </div>
   )
}

export default CreateUser