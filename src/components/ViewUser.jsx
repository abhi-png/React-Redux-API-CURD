import React from "react";
import { useSelector } from "react-redux";
import { AiOutlineClose } from 'react-icons/ai';
import styles from "./css/viewuser.module.css";

const ViewUser = ({ id, setShowPopup }) => {
   const allusers = useSelector((state) => state.user.users);
   const singleUser = allusers.filter((ele) => ele.id === id);

   return (
      <div className={styles.modalBackground}>
         <div className={styles.modalContainer}>
            <AiOutlineClose className="mt-2 float-right cursor-pointer" onClick={() => setShowPopup(false)} />
            <div className="mt-12 pt-4 border-t-2">
               <h2 className="font-medium text-gray-700 dark:text-gray-600">Name: {singleUser[0].name}</h2>
               <h3 className="font-medium text-gray-700 dark:text-gray-600">Email: {singleUser[0].email}</h3>
               <h4 className="font-medium text-gray-700 dark:text-gray-600">Age: {singleUser[0].age}</h4>
               <p className="font-medium text-gray-700 dark:text-gray-600">Gender: {singleUser[0].gender}</p>
            </div>
         </div>
      </div>
   )
}

export default ViewUser