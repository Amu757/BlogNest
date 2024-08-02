import React, { useState } from "react";
import authService from "../appwrite/auth";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../store/authSlice";
import { Button, Input} from "./index.js";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import "./components.css";
function Signup() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();

  const create = async (data) => {
    setError("");
    try {
      const userData = await authService.createAccount(data);
      if (userData) {
        const userData = await authService.getCurrentUser();
        if (userData) dispatch(login(userData));
        navigate("/");
      }
    } catch (error) {
      console.log(error)
      setError(error.message);
    }
  };

  return (
    <form className="form-layout" onSubmit={handleSubmit(create)}>
      <p className="heading">Create New Account</p>
      {error && <p className="errormsg">{error}</p>}
      <div className="input-container">
        <Input
          label="Full Name: "
          placeholder="Enter your full name"
          {...register("name", {
            required: true,
          })}
        />
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
          Sign up
        </Button>
      </div>
      <p className="lastline">
        Already Regestered? &nbsp;
        <Link
          to="/login"
          className="font-medium text-primary transition-all duration-200 hover:underline"
        >
          Sign In
        </Link>
      </p>
    </form>
  );
}

export default Signup;
