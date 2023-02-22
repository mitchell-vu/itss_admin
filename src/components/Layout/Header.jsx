import React, { useEffect, useState } from "react";

export const Header = () => {
  return (
    <header className="bg-white border-b border-b-zinc-200 flex flex-row justify-between items-center px-8 py-6">
      <h2 className="text-sm">
        <span className="font-bold">ITSS</span>
        <span className="ml-2">Administration</span>
      </h2>
      <div></div>
    </header>
  );
};
