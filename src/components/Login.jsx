import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login as authLogin } from "../store/authSlice";
import { Button, Input } from "./index";
import { useDispatch } from "react-redux";
import authService from "../appwrite/auth";
import { useForm } from "react-hook-form";
import Loader from "../components/Loder";
import "./components.css";
function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");
  const [loding, setLoading] = useState(false);

  const login = async (data) => {
    setError("");
    
    try {
      setLoading(true);
      const session = await authService.login(data);
      if (session) {
        const userData = await authService.getCurrentUser();

        
        if (userData) dispatch(authLogin(userData));
        setLoading(false)
        navigate("/");
      }
    } catch (error) {
      console.log(error)
      setLoading(false)
      setError(error.message);
    }
  };

  return (
    <>
      {!loding ? (
        <form className="form-layout" onSubmit={handleSubmit(login)}>
          <p className="heading" id="headline">
            Login Your Account
          </p>
          {error && <p className="errormsg">{error}</p>}
          <div className="input-container">
            <Input
              label="Email: "
              placeholder="Enter your email"
              type="email"
              {...register("email", {
                required: true,
                validate: {
                  matchPatern: (value) =>
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                    "Email address must be a valid address",
                },
              })}
            />
            <Input
              label="Password: "
              type="password"
              placeholder="Enter your password"
              {...register("password", {
                required: true,
              })}
            />
            <Button type="submit" className="submitbtn">
              Sign in
            </Button>
          </div>
          <p className="lastline">
            New User?&nbsp;
            <Link to="/signup">Sign Up</Link>
          </p>
        </form>
      ) : (
        <Loader />
      )}
    </>
  );
}

export default Login;
