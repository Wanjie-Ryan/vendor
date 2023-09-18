import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RegisterPagesComponent from "./pages/register/register";
import LoginPagesComponent from "./pages/login/login";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<RegisterPagesComponent />} />
          <Route path="/login" element={<LoginPagesComponent />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
