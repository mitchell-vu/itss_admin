import React from "react";

import SideNavLink from "./SideNavLink";

import "./SideNav.scss";

const SIDENAV_LINKS = [
  {
    id: "questions",
    title: "Quản lý câu hỏi",
    to: "/admin/questions",
    icon: <i className="fa-regular fa-question-circle"></i>,
    color: "#ff4f42",
    altColor: "#FFF0F0",
  },
];

export const SideNav = () => {
  return (
    <aside className="sidebar relative hidden md:block">
      <nav className="side-nav absolute top-0 left-0 h-full z-50">
        <div className="side-nav__inner absolute top-0 left-0 h-full bg-zinc-900">
          <ul className="sticky top-0 w-full flex flex-col gap-4 p-4 overflow-hidden">
            <li className="">
              <a href="/" className="side-nav__link flex flex-row items-center">
                <div className="flex-shrink-0 w-12 h-12 bg-clm-red rounded overflow-hidden">
                  <img
                    src="https://storage.googleapis.com/hust-files/4586005734621184/images/57348056_10157388605544048_7000169318017138688_o_.2m.png"
                    className="w-full h-full"
                    alt="ColorME"
                  />
                </div>
                <div className="side-nav__link__title text-white ml-3">
                  <div className="font-bold">ITSS</div>
                  <div className="text-sm text-zinc-400">Administration</div>
                </div>
              </a>
            </li>

            <div className="flex flex-col gap-4">
              {SIDENAV_LINKS.map((link) => (
                <li
                  key={`nav-${link.id}`}
                  className="relative flex justify-start items-center"
                >
                  <SideNavLink
                    to={link.to}
                    className="side-nav__link flex justify-start items-center rounded gap-4"
                    color={link.color}
                    altcolor={link.altColor}
                  >
                    <div className="side-nav__link__icon w-12 h-12 rounded">
                      <div className="w-12 h-12 text-xl flex justify-center items-center">
                        {link.icon}
                      </div>
                    </div>
                    <span className="side-nav__link__title text-lg text-white">
                      {link.title}
                    </span>
                  </SideNavLink>
                </li>
              ))}
            </div>
          </ul>
        </div>
      </nav>
    </aside>
  );
};
