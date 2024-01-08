import "./App.css";
import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { FiSettings } from "react-icons/fi";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";

import { Navbar, Footer, Sidebar, ThemeSettings } from "./components"; //bcz index.js can use them one line
import {
  Ecommerce,
  Orders,
  Calendar,
  Employees,
  Stacked,
  Pyramid,
  Customers,
  Kanban,
  Line,
  Area,
  Bar,
  Pie,
  Financial,
  ColorPicker,
  ColorMapping,
  Editor,
} from "./pages";


import Dashboard from "./pages/Student/DashBoard/DashBoard";
import ModuleDash from "./pages/Student/DashBoard/ModuleDash";

import Allstud from "./pages/Student/Allstud";
import Addstud from "./pages/Student/Addstud";
import Deletestud from "./pages/Student/Deletestud";
import Editstud from "./pages/Student/Editstud";
import Viewstud from "./pages/Student/Viewstud";

import Alllec from "./pages/Lecturer/Alllec";
import Addlec from "./pages/Lecturer/Addlec";
import Editlec from "./pages/Lecturer/Editlec";
import Deletelec from "./pages/Lecturer/Deletelec";
import Viewlec from "./pages/Lecturer/Viewlec";

import Allmod from "./pages/Module/Allmod";
import Addmod from "./pages/Module/Addmod";
import Deletemod from "./pages/Module/Deletemod";
import Editmod from "./pages/Module/Editmod";
import Viewmod from "./pages/Module/Viewmod";

import LecMaterial from "./pages/Lecturer/LecMaterial";
import ModSubmission from "./pages/Lecturer/ModSubmission";
import StudModSubView from "./pages/Lecturer/StudModSubView";

import LecMaterialView from "./pages/Student/LecMaterialView";
import ModSubmissionView from "./pages/Student/ModSubmissionView";
import StudModSubmission from "./pages/Student/StudModSubmission";

import LecDashboard from "./pages/Lecturer/DashBoard/LecDashBoard";
import LecModuleDash from "./pages/Lecturer/DashBoard/LecModuleDash";
import AdminDash from "./pages/Admin/AdminDashBoard";
import Login from "./pages/Login/LoginPage";

import { useStateContext } from "./contexts/ContextProvider"
import { useDispatch } from "react-redux";
import { getUserAction, refreshAction } from "./redux/user/userSlice";
import { AdminPrivateRoutes } from "./routes/privateRouteAdmin";
import LoggedPrivateRoutes from "./routes/privateRoutes";



function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserAction(), refreshAction());
  });

  const {
    activeMenu,
    themeSettings,
    setThemeSettings,
    currentColor,
    currentMode,
  } = useStateContext();
  // const activeMenu = true;

  
  return (
    <>
      <div className={currentMode === "Dark" ? "dark" : ""}>
        <BrowserRouter>
          <div className="flex relative dark:bg-main-dark-bg">
            <div className="fixed right-4 bottom-4" style={{ zIndex: "1000" }}>
              <TooltipComponent content="Settings" position="Top">
                <button
                  type="button"
                  onClick={() => setThemeSettings(true)}
                  className="text-3xl text-white p-3 hover:drop-shadow-xl hover:bg-light-gray"
                  style={{ background: currentColor, borderRadius: "50%" }}
                >
                  <FiSettings />
                </button>
              </TooltipComponent>
            </div>
            {activeMenu ? (
              <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white ">
                <Sidebar />
              </div>
            ) : (
              <div className="w-0 dark:bg-secondary-dark-bg">
                <Sidebar />
              </div>
            )}
            <div
              className={
                activeMenu
                  ? "dark:bg-main-dark-bg  bg-main-bg min-h-screen md:ml-72 w-full  "
                  : "bg-main-bg dark:bg-main-dark-bg  w-full min-h-screen flex-2 "
              }
            >
              {window.location.pathname !== "/" && (
              // <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full ">
                <Navbar />
              // </div>
              )}

              <div>
                {themeSettings && <ThemeSettings />}

                <Routes>
                <Route path="/" element={<Login />} />
                  {/* dashboard  */}
                  <Route path="/student/dashboard" element={<Dashboard />} />
                  <Route path="/student/module" element={<ModuleDash />} />

                  <Route path="/lecturer/dashboard" element={<LecDashboard />}/>
                  <Route path="/lecturer/module" element={<LecModuleDash />} />


                  {/* <Route element={<LoggedPrivateRoutes />}> */}
                  <Route path="/admin/dashboard/" element={<AdminDash />} />

                  {/*student pages */}
                  <Route path="/admin/student/" element={<Allstud />} />
                  <Route path="/admin/student/addstud" element={<Addstud />} />
                  <Route
                    path="/admin/student/editstud/:id"
                    element={<Editstud />}
                  />
                  <Route
                    path="/admin/student/viewstud/:id"
                    element={<Viewstud />}
                  />
                  <Route
                    path="/admin/student/deletestud/:id"
                    element
                    ={<Deletestud />}
                  />

                  {/*lecturer pages */}
                  <Route path="/admin/lecturer/" element={<Alllec />} />
                  <Route path="/admin/lecturer/addlec" element={<Addlec />} />
                  <Route
                    path="/admin/lecturer/viewlec/:id"
                    element={<Viewlec />}
                  />
                  <Route
                    path="/admin/lecturer/editlec/:id"
                    element={<Editlec />}
                  />
                  <Route
                    path="/admin/lecturer/deletelec/:id"
                    element={<Deletelec />}
                  />

                  {/*module pages*/}
                  <Route path="/admin/module/" element={<Allmod />} />
                  <Route path="/admin/module/addmod" element={<Addmod />} />
                  <Route
                    path="/admin/module/viewmod/:id"
                    element={<Viewmod />}
                  />
                  <Route
                    path="/admin/module/editmod/:id"
                    element={<Editmod />}
                  />
                  <Route
                    path="/admin/module/deletemod/:id"
                    element={<Deletemod />}
                  />

                  {/* </Route> */}

                  <Route path="/studentfile/" element={<StudModSubmission />} />
                  <Route path="/file/view" element={<LecMaterialView />} />
                  <Route path="/modulefile/view" element={<ModSubmissionView />} />

                  

                  <Route path="/file/" element={<LecMaterial />} />
                  <Route path="/studentfile/view" element={<StudModSubView />} />
                  <Route path="/modulefile/" element={<ModSubmission />} />

                  

                  {/**Not required */}
                  {/* pages  */}
                  <Route path="/ecommerce" element={<Ecommerce />} />
                  <Route path="/orders" element={<Orders />} />
                  <Route path="/employees" element={<Employees />} />
                  <Route path="/customers" element={<Customers />} />

                  {/* apps  */}
                  <Route path="/kanban" element={<Kanban />} />
                  <Route path="/editor" element={<Editor />} />
                  <Route path="/calendar" element={<Calendar />} />
                  <Route path="/color-picker" element={<ColorPicker />} />
                </Routes>
              </div>
            </div>
            {/* <Footer /> */}
          </div>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
