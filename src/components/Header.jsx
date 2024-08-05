import React, { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

function Header({ roleChange }) {
  const { user, toggleRole, handleLogout } = useContext(AuthContext);

  const handleRoleChange = async (e) => {
    const newRole = e.target.checked ? "publisher" : "writer";
    await toggleRole(newRole);
    roleChange();
  };
  const navigate = useNavigate();

  const logout = () => {
    handleLogout();
    navigate("/login");
  };

  const formatName = (name) => {
    return name.charAt(0).toUpperCase() + name.slice(1);
  };

  return (
    <>
      <div className="flex justify-between py-5">
        <div className="font-bold text-pink-700 text-xl">
          {formatName(user.name)}
        </div>
        <div className="flex items-center gap-2 font-semibold">
          <div>Writer</div>
          <label className="relative inline-block w-16 h-8">
            <input
              type="checkbox"
              onChange={handleRoleChange}
              className="opacity-0 w-0 h-0 peer"
              checked={user.role === "publisher"}
            />
            <span
              className="absolute cursor-pointer top-0 left-0 right-0 bottom-0 bg-gray-300 transition duration-400 peer-checked:bg-blue-500 peer-focus:ring-1 peer-focus:ring-blue-500
                      before:absolute before:content-[''] before:h-6 before:w-6 before:left-1 before:bottom-1 before:bg-white before:transition before:duration-400 peer-checked:before:translate-x-8 before:rounded-full rounded-full"
            ></span>
          </label>
          <div>Publisher</div>
        </div>
        <button className="font-bold text-pink-950" onClick={logout}>
          Logout
        </button>
      </div>
      <hr />
    </>
  );
}

export default Header;
