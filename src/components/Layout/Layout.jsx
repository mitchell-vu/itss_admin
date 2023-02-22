import React from "react";
import { Outlet } from "react-router";

import { Header } from "./Header";
import { Footer } from "./Footer";
import { SideNav } from "./SideNav/SideNav";

import "./Layout.scss";

export const Layout = ({ children }) => {
  return (
    <>
      <div className="min-h-screen flex flex-row">
        <SideNav />
        <div className="main-container w-screen flex flex-col bg-gray-100 pb-16">
          <Header />
          <main className="main pt-6">{children ?? <Outlet />}</main>
        </div>
      </div>
      <Footer />
    </>
  );
};
