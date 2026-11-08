import React from "react";

const Logo = ({ className = "" }) => {
  return (
    <div
      className={`flex items-center gap-2 font-bold tracking-tight ${className}`}
    >
      <span className="grid h-9 w-9 place-items-center rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 text-lg text-white shadow-lg shadow-indigo-500/30">
        M
      </span>
      <span className="text-xl text-zinc-100">
        Mega<span className="text-indigo-400">Blog</span>
      </span>
    </div>
  );
};

export default Logo;
