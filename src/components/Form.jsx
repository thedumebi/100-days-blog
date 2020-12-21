import React, { useState } from "react";
import queryString from "querystring";

function Form(props) {
  const [register, setRegister] = useState({
    email: "",
    password: "",
    cpassword: "",
  });

  const [login, setLogin] = useState({
    email: "",
    password: "",
  });

  function handleLogin(event) {
    const { name, value } = event.target;
    setLogin((prevValue) => {
      return { ...prevValue, [name]: value };
    });
  }

  function submitLogin() {
    const url = "http://localhost:9000/login/";
    fetch(url, {
      credentials: "include",
      method: "POST",
      body: JSON.stringify(login),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => console.log(res.data))
      .then((res) => res)
    props.login(true);
  }

  function handleRegister(event) {
    const { name, value } = event.target;
    setRegister((prevValue) => {
      return { ...prevValue, [name]: value };
    });
  }

  function submitRegister() {
    const url = "http://localhost:9000/register/";
    fetch(url, {
      method: "POST",
      body: queryString.stringify(register),
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    })
      .then((res) => console.log(res))
      .then((res) => res)
    props.register(true);
  }

  return (
    <form className="form">
      <input
        onChange={props.isRegistered ? handleLogin : handleRegister}
        name="email"
        type="text"
        placeholder="Email"
      />
      <input
        onChange={props.isRegistered ? handleLogin : handleRegister}
        name="password"
        type="password"
        placeholder="Password"
      />
      {!props.isRegistered && (
        <input
          onChange={handleRegister}
          name="cpassword"
          type="password"
          placeholder="Confirm Password"
        />
      )}

      <button
        onClick={props.isRegistered ? submitLogin : submitRegister}
        type="button"
      >
        {props.isRegistered ? "Login" : "Register"}
      </button>
    </form>
  );
}

export default Form;
