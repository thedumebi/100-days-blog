import React from "react";
import Form from "./Form";

function Login(props) {

  return (
    <div className="container">
      <Form isRegistered={props.isRegistered} />
    </div>
  );
}

export default Login;
