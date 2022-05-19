import { SidebarData } from "./SidebarData";
import { Logout_Button, Logout_Image, Pill_Profile, Sidebar, Text_Center } from "./Sidebar.style";
import { Link } from "react-router-dom";
import "./Sidebar.css";
import { useAuthContext } from "components/page/Login/Auth/AuthContext";
function Navbar() {
  const { logout } = useAuthContext();

  return (
    <>
      <Sidebar className={true ? "nav-menu active" : "nav-menu"}>
        <div className="SidebarList">
          <Pill_Profile />

          <Text_Center>
            <div>username</div>
            <div>klongyaa.user@gmail.com</div>
          </Text_Center>
          {SidebarData.map((item, index) => {
            return (
              <li key={index} className={item.cName} id={window.location.pathname === item.path ? "active" : ""}>
                <Link to={item.path}>
                  {item.icon}
                  <span className="span_text" id={window.location.pathname === item.path ? "active" : ""}>
                    {item.title}
                  </span>
                </Link>
              </li>
            );
          })}
          <span>
            <Logout_Button onClick={logout}>Logout</Logout_Button>
            <Logout_Image />
          </span>
        </div>
      </Sidebar>
    </>
  );
}

export default Navbar;
