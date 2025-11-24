import { Outlet } from "react-router-dom";
import logo from "../../assets/Carplace24Logo.png";

const Auth = () => {
  return (
    <div className="min-h-screen w-full flex">
      <div className="w-1/2 flex items-center justify-center bg-gradient-to-br from-[#f4f8ff] via-white to-[#e9f3ff]">
        <img src={logo} alt="carplace24 logo" className="h-20 md:h-40" />
      </div>
      <div className="w-1/2 bg-white shadow-2xl flex items-center justify-center px-8 py-10">
        <div className="w-full max-w-[510px]">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Auth;
