import React from "react";

const Header = () => {
  return (
    <>
      <header className="left-0 top-0 z-50 w-full">
        <div className="top-full w-full bg-white py-5 px-6 shadow transition-all static ">
          <div className="flex w-full items-center justify-between px-10">
            <h1 className="mb-2 text-2xl font-semibold text-black">
              Item Management System
            </h1>
          </div>
        </div>
      </header>
    </>
  );
};


export default Header;