import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components'
import Logo from '../assets/logo.svg'
import { ToastContainer, toast } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"
import axios from 'axios'
import { registerRoute } from "../utils/APIRoutes"
function Register() {

  const navigate = useNavigate();

  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  })
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark"
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (handleValidation()) {
      const { password, confirmPassword, username, email } = values;
      const { data } = await axios.post(registerRoute, {
        username,
        email,
        password
      });
      if (data.status === false) {
        if(data.message == "Username already used"){
          toast.error("Email déjà utilisé !", toastOptions)
        }else{
          toast.error("Un problème a été rencontré !", toastOptions)
        }
      }
      if (data.status === true) {
        toast.success("Inscription réussi !", toastOptions)
        localStorage.setItem("chat-app_user", JSON.stringify(data.user))
        navigate('/');
      }
    }
  }
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  const handleValidation = () => {
    const { password, confirmPassword, username, email } = values;
    if (password !== confirmPassword) {
      toast.error("Password and confirm password should be same !", toastOptions)
      return false;
    } else if (username.length < 3) {
      toast.error("Username should be greater than 3 characters !", toastOptions)
      return false;

    } else if (password.length < 6) {
      toast.error("Password should be equal or greater than 6 characters !", toastOptions)
      return false;
    } else if (email === "") {
      toast.error("Email is required !", toastOptions)
      return false;
    }
    else {
      return true;
    }
  }
  return (
    <>
      <FormContainer>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="brand">
            <img src={Logo} alt="logo" />
            <h1>LineUp Chat</h1>

          </div>
          <input type="text" placeholder="Username" name="username" value={values.username} onChange={(e) => handleChange(e)} />
          <input type="email" placeholder="Email" name="email" value={values.email} onChange={(e) => handleChange(e)} />
          <input type="password" placeholder="password" name="password" value={values.password} onChange={(e) => handleChange(e)} />
          <input type="password" placeholder="Confirm password" name="confirmPassword" value={values.confirmPassword} onChange={(e) => handleChange(e)} />
          <button type="submit">Create user</button>
          <span type="submit">Already have an account ? <Link to="/login">Login</Link></span>
        </form>
      </FormContainer>
      <ToastContainer />

    </>
  )
}
const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 5rem;
    }
    h1 {
      color: white;
      text-transform: uppercase;
    }
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: #00000076;
    border-radius: 2rem;
    padding: 3rem 5rem;
  }
  input {
    background-color: transparent;
    padding: 1rem;
    border: 0.1rem solid #7a2048;
    border-radius: 0.4rem;
    color: white;
    width: 100%;
    font-size: 1rem;
    &:focus {
      border: 0.1rem solid #d42875;
      outline: none;
    }
  }
  button {
    background-color: #7a2048;
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    &:hover {
      background-color: #7a2048;
    }
  }
  span {
    color: white;
    text-transform: uppercase;
    a {
      color: #7a2048;
      text-decoration: none;
      font-weight: bold;
    }
  }
`;
export default Register