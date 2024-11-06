import React from "react";
import { Route, Routes } from "react-router-dom";
import AddressPage from "../pages/address";
import InformationPage from "../pages/information";
import PricePage from "../pages/price";




function RouterComponent() {
   return(
      <Routes>
         <Route path={"/"} element={<AddressPage/>} />
         <Route path={"/information"} element={<InformationPage/>} />
         <Route path={"/price"} element={<PricePage/>} />
      </Routes>
   )
}

export default RouterComponent