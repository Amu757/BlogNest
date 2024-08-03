import { useDispatch } from "react-redux";
import authService from "../../appwrite/auth";
import { logout } from "../../store/authSlice";
import { useNavigate } from "react-router-dom";

function LogoutBtn() {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const logoutHandler = () => {
    authService.logout().then(() => {
      dispatch(logout());
    });
     navigate("/")
  };
  return <button className="navButton logoutBtn" onClick={logoutHandler}>LogOut</button>;
}

export default LogoutBtn;
