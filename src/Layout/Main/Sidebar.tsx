import { Menu } from "antd";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { IoIosLogOut } from "react-icons/io";
import { IoSettingsOutline } from "react-icons/io5";

import { PiUserPlus } from "react-icons/pi";
import Cookies from "js-cookie";
import logo from "../../assets/Carplace24Logo.png";
import { FaUsers } from "react-icons/fa6";
import { FaHistory } from "react-icons/fa";
import { CiGrid32 } from "react-icons/ci";
import { ImFolderUpload } from "react-icons/im";
import { SiMaterialdesignicons } from "react-icons/si";
import { GiFertilizerBag } from "react-icons/gi";

interface MenuItem {
  key: string;
  icon?: React.ReactNode;
  label: React.ReactNode;
  children?: MenuItem[];
}

const Sidebar = () => {
  const location = useLocation();
  const path = location.pathname;
  const [selectedKey, setSelectedKey] = useState<string>("");
  const [openKeys, setOpenKeys] = useState<string[]>([]);
  const navigate = useNavigate();

  const handleLogout = (): void => {
    localStorage.removeItem("carPlaceAdminToken");
    localStorage.removeItem("carPlaceAdminRefreshToken");
    sessionStorage.removeItem("carPlaceAdminToken");
    sessionStorage.removeItem("carPlaceAdminRefreshToken");
    Cookies.remove("carPlaceAdminRefreshToken");
    navigate("/auth/login");
  };

  const menuItems: MenuItem[] = [
    {
      key: "/",
      icon: <CiGrid32 size={24} />,
      label: (
        <Link to="/" className="">
          Analytics
        </Link>
      ),
    },

    {
      key: "/users-list",
      icon: <PiUserPlus size={24} />,
      label: <Link to="/users-list">Users List</Link>,
    },
    {
      key: "/dealers-list",
      icon: <FaUsers size={24} />,
      label: <Link to="/dealers-list">Dealers List</Link>,
    },
    {
      key: "/private-seller-list",
      icon: <ImFolderUpload size={24} />,
      label: <Link to="/private-seller-list">Private Seller List</Link>,
    },
    {
      key: "/manage-brand-and-model",
      icon: <FaHistory size={24} />,
      label: <Link to="/manage-brand-and-model">Brand and Model</Link>,
    },
    {
      key: "/vehicle-list",
      icon: <FaHistory size={24} />,
      label: <Link to="/vehicle-list">Vehicle List</Link>,
    },
    {
      key: "/subscribers",
      icon: <GiFertilizerBag size={24} />,
      label: <Link to="/subscribers">Subscribers</Link>,
    },
    {
      key: "/subscriptions",
      icon: <SiMaterialdesignicons size={24} />,
      label: <Link to="/subscriptions">Subscriptions</Link>,
    },
    // {
    //   key: "/promotion",
    //   icon: <SiSupabase size={24} />,
    //   label: <Link to="/promotion">Promotion</Link>,
    // },
    {
      key: "subMenuSetting",
      icon: <IoSettingsOutline size={24} />,
      label: "Settings",
      children: [
        {
          key: "/personal-information",
          label: (
            <Link
              to="/personal-information"
              className="text-white hover:text-white"
            >
              Personal Information
            </Link>
          ),
        },
        {
          key: "/change-password",
          label: (
            <Link to="/change-password" className="text-white hover:text-white">
              Change Password
            </Link>
          ),
        },
        // {
        //   key: "/admin-panel",
        //   label: (
        //     <Link to="/admin-panel" className="text-white hover:text-white">
        //       Admin Panel
        //     </Link>
        //   ),
        // },

        {
          key: "/about-us",
          label: (
            <Link to="/about-us" className="text-white hover:text-white">
              About Us
            </Link>
          ),
        },
        {
          key: "/terms-and-condition",
          label: (
            <Link
              to="/terms-and-condition"
              className="text-white hover:text-white"
            >
              Terms And Condition
            </Link>
          ),
        },
        {
          key: "/privacy-policy",
          label: (
            <Link to="/privacy-policy" className="text-white hover:text-white">
              Privacy Policy
            </Link>
          ),
        },
        {
          key: "/f-a-q",
          label: (
            <Link to="/f-a-q" className="text-white hover:text-white">
              FAQ
            </Link>
          ),
        },
      ],
    },
    {
      key: "/logout",
      icon: <IoIosLogOut size={24} />,
      label: <p onClick={handleLogout}>Logout</p>,
    },
  ];

  useEffect(() => {
    const selectedItem = menuItems.find(
      (item) =>
        item.key === path || item.children?.some((sub) => sub.key === path)
    );

    if (selectedItem) {
      setSelectedKey(path);

      if (selectedItem.children) {
        setOpenKeys([selectedItem.key]);
      } else {
        const parentItem = menuItems.find((item) =>
          item.children?.some((sub) => sub.key === path)
        );
        if (parentItem) {
          setOpenKeys([parentItem.key]);
        }
      }
    }
  }, [path]);

  const handleOpenChange = (keys: string[]): void => {
    setOpenKeys(keys);
  };

  return (
    <div className="mt-5 overflow-y-scroll">
      <div className="px-10">
        <Link
          to={"/"}
          className="mb-10 flex items-center flex-col gap-2 justify-center py-4"
        >
          <img src={logo} alt="" />
        </Link>
      </div>
      <Menu
        mode="inline"
        selectedKeys={[selectedKey]}
        openKeys={openKeys}
        onOpenChange={handleOpenChange}
        style={{ borderRightColor: "transparent", background: "transparent" }}
        items={menuItems}
      />
    </div>
  );
};

export default Sidebar;
