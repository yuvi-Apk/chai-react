import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import authService from "@/appwrite/auth";
import { logout } from "@/store/slice/authSlice";

const LogoutBtn = ({ className = "" }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    authService.logout().then(() => {
      dispatch(logout());
      navigate("/");
    });
  };

  return (
    <button
      onClick={handleLogout}
      className={`px-4 py-2 rounded-lg text-sm font-medium text-red-300 border border-red-500/30 hover:bg-red-500/10 hover:text-red-200 transition-colors ${className}`}
    >
      Logout
    </button>
  );
};

export default LogoutBtn;
