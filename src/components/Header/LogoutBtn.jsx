import { useDispatch } from "react-redux";
import authService from "../../appwrite/auth";
import { logout } from "../../store/authSlice";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Loader from "../Loder";
function LogoutBtn() {
  const [loding, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const logoutHandler = () => {
    setLoading(true)
    authService.logout().then(() => {
      dispatch(logout());
      setLoading(false)
    });
    navigate("/");
  };
  return (
    <>
      {loding ? (
        <Loader />
      ) : (
        <button className="navButton logoutBtn" onClick={logoutHandler}>
          LogOut
        </button>
      )}
    </>
  );
}

export default LogoutBtn;
