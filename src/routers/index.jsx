import React from "react";
import { Route, Routes } from "react-router-dom";
import AddressPage from "../pages/address";
import InformationPage from "../pages/information";
import PricePage from "../pages/price";
import LoginPage from "../pages/login";
import SignPage from "../pages/sign";

function RouterComponent() {
  return (
    <Routes>
      <Route path="/adress" element={<AddressPage />} />
      <Route path="/information" element={<InformationPage />} />
      <Route path="/price" element={<PricePage />} />
      <Route path="/" element={<LoginPage />} />
      <Route path="/sign" element={<SignPage />} />
    </Routes>
  );
}

export default RouterComponent;
