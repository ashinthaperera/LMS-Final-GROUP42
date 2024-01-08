import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { SiShopware } from "react-icons/si";
import { MdOutlineCancel } from "react-icons/md";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";

import { lecLinks, links, studLinks } from "../data/dummy";
import { useStateContext } from "../contexts/ContextProvider";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../redux/user/userSlice";

const Sidebar = () => {
  // const activeMenu = true;
  const { activeMenu, setActiveMenu, screenSize, currentColor } =
    useStateContext();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  console.log("user", user);

  // var dataNav = user.role === "admin" ? links : links;
  var dataNav = user.role === "student" ?  studLinks : links;
  // dataNav = user.role === "lecturer" ?  lecLinks : links;
  const dataLinks = () => {
    if (user.role === "admin") {
      dataNav = links;
      // return links;
    } else if (user.role === "student") {
      dataNav = studLinks;
    }
     else if (user.role === "lecturer") {
      dataNav = lecLinks;
    }
  }
  dataLinks()
 


  const handleCloseSideBar = () => {
    if (activeMenu !== undefined && screenSize <= 900) {
      setActiveMenu(false);
    }
  };

  const activeLink =
    "flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg  text-white  text-md m-2";
  const normalLink =
    "flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-md text-gray-700 dark:text-gray-200 dark:hover:text-black hover:bg-light-gray m-2";

  return (
    <div className="ml-3 h-screen md:overflow-hidden overflow-auto md:hover:overflow-auto pb-10">
      {activeMenu && (
        <>
          <div className="flex justify-between items-center">
            <Link
              to="/"
              onClick={handleCloseSideBar} //close side bar when there is no space
              className="items-center gap-3 ml-3 mt-4 flex text-xl font-extrabold tracking-tight dark:text-white text-slate-900"
            >
              <SiShopware /> <span>Student LMS</span>
            </Link>
            <TooltipComponent content="Menu" position="BottomCenter">
              <button
                type="button"
                onClick={() =>
                  setActiveMenu((prevActiveMenu) => !prevActiveMenu)
                }
                className="text-xl rounded-full p-3 hover:bg-light-gray mt-4 block " //md:hidden <-insert
              >
                <MdOutlineCancel />
              </button>
            </TooltipComponent>
          </div>
          <div className="mt-10">
            {/* <h3>hi {user.role}</h3> */}

            {dataNav.map((item) => (
              <div key={item.title}>
                <p className="text-gray-400 dark:text-gray-400 m-3 mt-4 uppercase">
                  {item.title}
                </p>
                {item.links.map((link) => (
                  <NavLink
                    to={`/${link.direct}`}
                    key={link.name}
                    onClick={handleCloseSideBar} //close side bar when there is no space
                    style={({ isActive }) => ({
                      backgroundColor: isActive ? currentColor : "",
                    })}
                    className={({ isActive }) =>
                      isActive ? activeLink : normalLink
                    } //special effects
                  >
                    {link.icon}
                    <span className="capitalize ">{link.name}</span>
                  </NavLink>
                ))}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
                  // }//data
};

export default Sidebar;
