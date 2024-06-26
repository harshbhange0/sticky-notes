import React from "react";

import SidebarItem from "./sidebarItem";
import Navbar from "./Navbar";

export default function Sidebar({ children }: { children: React.ReactNode }) {
  return (
    <>
      <nav className="w-full navbar border-b">
        <div className="flex-none lg:hidden">
          <label
            htmlFor="sideBar"
            aria-label="open sidebar"
            className="btn btn-square btn-ghost"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block w-6 h-6 stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </label>
        </div>
        <div className="flex-1 px-2 mx-2">
          <Navbar />
        </div>
      </nav>
      <div className="drawer lg:drawer-open">
        <input id="sideBar" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col">{children}</div>
        <div className="drawer-side">
          <label
            htmlFor="sideBar"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <aside className="menu p-4 w-80 min-h-full bg-white border-r">
            <div className="flex flex-col items-center w-full ">
              <SidebarItem href="/">
                <Light />
                <span>Nots</span>
              </SidebarItem>
              <SidebarItem href="/archived">
                <Archive />
                <span>Archive</span>
              </SidebarItem>
              <SidebarItem href="/trashed">
                <Trash />
                <span>Trash</span>
              </SidebarItem>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}

const Light = () => {
  return (
    <div className="grid place-items-center w-auto">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <path d="M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7zm2.85 11.1l-.85.6V16h-4v-2.3l-.85-.6A4.997 4.997 0 0 1 7 9c0-2.76 2.24-5 5-5s5 2.24 5 5c0 1.63-.8 3.16-2.15 4.1z"></path>
      </svg>
    </div>
  );
};

const Archive = () => {
  return (
    <div className="grid place-items-center w-auto">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <path d="M20.54 5.23l-1.39-1.68C18.88 3.21 18.47 3 18 3H6c-.47 0-.88.21-1.16.55L3.46 5.23C3.17 5.57 3 6.02 3 6.5V19c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6.5c0-.48-.17-.93-.46-1.27zM6.24 5h11.52l.83 1H5.42l.82-1zM5 19V8h14v11H5zm11-5.5l-4 4-4-4 1.41-1.41L11 13.67V10h2v3.67l1.59-1.59L16 13.5z"></path>
      </svg>
    </div>
  );
};

const Trash = () => {
  return (
    <div className="grid place-items-center w-auto">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <path d="M15 4V3H9v1H4v2h1v13c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V6h1V4h-5zm2 15H7V6h10v13z"></path>
        <path d="M9 8h2v9H9zm4 0h2v9h-2z"></path>
      </svg>
    </div>
  );
};
// <aside className={` border-r ${className}`}>
// <div className="flex flex-col items-center w-full ">
//   <SidebarItem href="/">
//     <Light />
//     <span>Nots</span>
//   </SidebarItem>
//   <SidebarItem href="/archived">
//     <Archive />
//     <span>Archive</span>
//   </SidebarItem>
//   <SidebarItem href="/trashed">
//     <Trash />
//     <span>Trash</span>
//   </SidebarItem>
// </div>
//   </aside>
