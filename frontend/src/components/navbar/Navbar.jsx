import { useSelector } from "react-redux";

import "../styles/navbar.css";
import UserNavbar from "./userNavbar";
import AdminNavbar from "./adminNav";
import PublicNavbar from "./publicNavbar";
const Navbar = () => {
  const isLoggedIn = useSelector((state) => state.users?.userAuth);
  const userRole = useSelector((state) => state.users?.userAuth?.role);
  

  console.log(userRole);

  return (
    <div>
      {userRole === "admin" && <AdminNavbar />}
      {userRole === "user" && <UserNavbar />}
      {!isLoggedIn && <PublicNavbar />}
    </div>
  );
};

export default Navbar;
