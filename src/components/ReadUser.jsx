import React, { useEffect, useState } from "react";
import ViewUser from "./ViewUser";
import { useDispatch, useSelector } from "react-redux";
import { deleteUsers, showUsers } from "../redux/apislice/userDetailsSlice";
import { useNavigate } from "react-router-dom";

const ReadUser = () => {
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const [id, setId] = useState();
   const [showPopUp, setShowPopUp] = useState(false);
   const [radioData, setRadioData] = useState("");
   const { users, loading, searchData } = useSelector((state) => state.user);

   useEffect(() => {
      dispatch(showUsers());
   }, []);

   if (loading) {
      return (
         <h2 className="text-white text-xl pt-20 text-center">Loading ...</h2>
      );
   }

   return (
      <>
         {showPopUp && <ViewUser id={id} setShowPopup={setShowPopUp} />}
         <div className="pt-20">
            <h2 className="text-center text-white text-3xl">
               Total Users - {users.length}
            </h2>
            <div className="flex items-center justify-center">
               <div className="mx-2">
                  <input
                     type="radio"
                     name="gender"
                     checked={radioData === ""}
                     onChange={() => setRadioData("")}
                  />
                  <span className="text-white -ml-1">All</span>
               </div>
               <div className="mx-2">
                  <input
                     type="radio"
                     name="gender"
                     value="Male"
                     checked={radioData === "Male"}
                     onChange={(e) => setRadioData(e.target.value)}
                  />
                  <span className="text-white -ml-1">Male</span>
               </div>
               <div className="mx-2">
                  <input
                     type="radio"
                     name="gender"
                     value="Female"
                     checked={radioData === "Female"}
                     onChange={(e) => setRadioData(e.target.value)}
                  />
                  <span className="text-white -ml-1">Female</span>
               </div>
            </div>
         </div>

         <div className="pt-6 pl-4 pr-4 flex flex-wrap items-center justify-center">
            {users &&
               users
                  .filter((data) => {
                     if (searchData.length === 0) {
                        return data;
                     } else {
                        const nameMatch = data.name
                           .toLowerCase()
                           .includes(searchData.toLowerCase());
                        const ageMatch = data.age
                           .toLowerCase()
                           .includes(searchData.toLowerCase());
                        return nameMatch || ageMatch;
                     }
                  })
                  .filter((data) => {
                     if (radioData === "Male") {
                        return data.gender === radioData;
                     } else if (radioData === "Female") {
                        return data.gender === radioData;
                     } else return data;
                  })
                  .map((data) => (
                     <div
                        className="block mx-2 my-2 max-w-sm p-6 w-80 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 overflow-hidden"
                        key={data.id}
                     >
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                           {data.name}
                        </h5>
                        <p className="font-normal text-gray-700 dark:text-gray-400">
                           Age: {data.age}
                        </p>
                        <p className="font-normal text-gray-700 dark:text-gray-400">
                           Gender: {data.gender}
                        </p>
                        <p className="font-normal text-gray-700 dark:text-gray-400">
                           Email: {data.email}
                        </p>
                        <div
                           className="inline-flex rounded-md shadow-sm mt-4"
                           role="group"
                        >
                           <button
                              type="button"
                              className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-l-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white"
                              onClick={() => [setId(data.id), setShowPopUp(true)]}
                           >
                              View
                           </button>
                           <button
                              type="button"
                              className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border-t border-b border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white"
                              onClick={() => navigate(`/edit/${data.id}`)}
                           >
                              Edit
                           </button>
                           <button
                              type="button"
                              className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-r-md hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white"
                              onClick={() => dispatch(deleteUsers(data.id))}
                           >
                              Delete
                           </button>
                        </div>
                     </div>
                  ))}
         </div>
      </>
   );
};

export default ReadUser;
