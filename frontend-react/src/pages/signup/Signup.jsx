import React, { useState } from "react";
import  UserService from "../../service/UserService";
 import { useNavigate } from "react-router-dom";
import { TextField } from "@mui/material";
import { Button } from "@mui/material";
const userService = new UserService()

export default function Signup() {
   const navigate = useNavigate();
  const [field, setFeild] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  //  const {firstname, lastname, email, password }=field;
  const changeHandler = (e) => {
    setFeild((previosvalue) => {
      return { ...previosvalue, [e.target.name]: e.target.value };
    });
  };

  const onSubmit = () => {
    let data = {
      firstName: field.firstName,
      lastName: field.lastName,
      email: field.email,
      password: field.password,
    };
    userService.Signup("http://localhost:5500/users/register",data)
    .then((res) => {
      console.log("login response", res.data);
    
    })
    .catch((err) => {
      console.warn(err);
    });
   navigate("/login");
  };

  return (
    <div className="signup">
      <div className="fullName">
        <TextField
          name="firstName"
          size="small"
          type="text"
          variant="outlined"
          label="First Name"
          onChange={(e) => {
            changeHandler(e);
          }}
        />
      </div>
      <div className="emailInput">
        <TextField
          name="lastName"
          size="small"
          type="text"
          variant="outlined"
          label="lastname"
          onChange={(e) => {
            changeHandler(e);
          }}
        />
      </div>
      <div className="password">
        <TextField
          name="email"
          size="small"
          type="email"
          variant="outlined"
          label="email"
          onChange={(e) => {
            changeHandler(e);
          }}
        />
      </div>
      <div className="password">
        <TextField
          name="password"
          size="small"
          type="password"
          variant="outlined"
          label="password"
          onChange={(e) => {
            changeHandler(e);
          }}
        />
      </div>
      <div>
        {" "}
        <Button className="signupButton" onClick={() => onSubmit()}>
          {" "}
          SignUp{" "}
        </Button>
      </div>
    </div>
  );
}