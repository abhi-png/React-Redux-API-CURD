import React from "react";
import { useNavigate } from "react-router-dom";

const ErrorPage = () => {
   const navigate = useNavigate();

   return (
      <div className="text-center pt-40">
         <h1 className="mt-40 text-white text-9xl mb-10">404</h1>
         <h2 className="text-2xl text-sky-400/75 mb-4">Oops, Page Not Found!</h2>
         <button className="text-blue-600 mb-60" onClick={() => navigate("/")}>Back To Home</button>
      </div>
   )
}

export default ErrorPage