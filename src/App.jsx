import React, { useEffect } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router";
import { ToastContainer } from "react-toastify";

import { Layout } from "./components/Layout/Layout";
import { QuestionsPage, UsersPage, FeaturePage, QuestionPage } from "./pages";

const App = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/admin/questions" replace />} />

        <Route path="admin" element={<Layout />}>
          <Route path="questions">
            <Route path="" element={<QuestionsPage />} />
            <Route path=":id" element={<QuestionPage />} />
          </Route>
          <Route path="users" element={<UsersPage />} />
          <Route path="features" element={<FeaturePage />} />
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
