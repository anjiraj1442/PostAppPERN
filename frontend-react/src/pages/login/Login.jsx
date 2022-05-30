import { TextField } from "@mui/material";
import React from "react";
import  UserService from "../../service/UserService";

import { Button } from "@mui/material";
 import { useNavigate } from "react-router-dom";
const userService = new UserService()
function Login() {
 const navigate = useNavigate();
  const [field, setFeild] = React.useState({
    email: "",
    password: "",
  });
  
  const changeHandler = (e) => {
    setFeild({ ...field, [e.target.name]: e.target.value });
  };

  const onSubmit = () => {
    console.log("message");
    let data = {
      email: field.email,
      password: field.password,
    };
    userService.Login("http://localhost:5500/users/signin",data)
      .then((result) => {
        console.log("result", result.data);
      })
      .catch((err) => {
        console.log("error", err);
      });

      navigate("/post");
  };
  return (
    <div>
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
        SignIn{" "}
      </Button>
    </div>
    </div>
  );
}

export default Login;