import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RegisterPagesComponent from "./pages/register/register";
import LoginPagesComponent from "./pages/login/login";
import DashboardPagesComponent from "./pages/dashboard/dash";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<RegisterPagesComponent />} />
          <Route path="/login" element={<LoginPagesComponent />} />
          <Route path="/dashboard" element={<DashboardPagesComponent />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
