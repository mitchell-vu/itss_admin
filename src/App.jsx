import React from "react";
import { Navigate, Route, Routes } from "react-router";
import { ToastContainer } from "react-toastify";

import { Layout } from "./components/Layout/Layout";
import { Questions } from "./pages";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/admin/questions" replace />} />

        <Route path="admin" element={<Layout />}>
          <Route path="questions" element={<Questions />} />
        </Route>
      </Routes>

      <ToastContainer
        theme="colored"
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        draggable
        pauseOnHover
        closeOnClick
      />
    </>
  );
};

export default App;
