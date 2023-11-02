import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar"
import ReadUser from "./components/ReadUser";
import CreateUser from "./components/CreateUser";
import UpdateUser from "./components/UpdateUser";
import ErrorPage from "./components/ErrorPage";
import Footer from "./components/Footer";

function App() {
   return (
      <div className="App">
         <Router>
            <NavBar />
            <Routes>
               <Route index element={<ReadUser />} />
               <Route path="/createuser" element={<CreateUser />} />
               <Route path="/edit/:id" element={<UpdateUser />} />
               <Route path="/*" element={<ErrorPage />} />
            </Routes>
            <Footer />
         </Router>
      </div>
   );
}

export default App;