import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLogin } from "../Context/LoginContext";

function Login() {
  const { login } = useLogin();
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    name:"",
    email:"",
    password:""
  })

  const handleChange = (e) =>{
    setFormData({
      ...formData,
      [e.target.name] : e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8000/api/auth/login/", {
        method: "POST",
        headers: {
          "Content-Type" : "application/json",
        },
        body: JSON.stringify({
          username: formData.email,
          password: formData.password,
        }),
      });
    const data = await response.json();

    if(!response.ok){
      alert(data.detail  || "Login failed")
      return;
    }

    // backend should return : user + access token
    login({ email: formData.email }, data.access);
    navigate("/");

    } catch (error) {
      console.error("Login error: ", error);
      
    }
    // e.preventDefault()

    // const userData = {
    //   name: formData.name,
    //   email: formData.email
    // }

    // login(userData);
    // navigate("/")
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fffbfb] dark:bg-black px-4">
      <div className="w-full max-w-md bg-white dark:bg-[#181818] rounded-2xl shadow-xl p-8">
        
        {/* Heading */}
        <h2 className="text-3xl font-bold text-center text-[#d6336c]">
          Welcome Back
        </h2>
        <p className="text-center text-gray-500 dark:text-gray-400 mt-2">
          Login to continue shopping
        </p>

        {/* Form */}
        <form 
        className="mt-8 space-y-5"
        onSubmit={handleSubmit}>


          {/* Name */}
          {/* <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="Enter your Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d6336c] dark:bg-black dark:border-gray-600 dark:text-white"
            />
          </div> */}
          
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d6336c] dark:bg-black dark:border-gray-600 dark:text-white"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d6336c] dark:bg-black dark:border-gray-600 dark:text-white"
            />
          </div>

          {/* Forgot Password */}
          <div className="text-right">
            <Link
              // to="/forgot-password"
              className="text-sm text-[#d6336c] hover:underline"
            >
              Forgot Password?
            </Link>
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-[#d6336c] text-white py-2 rounded-lg font-semibold hover:bg-pink-600 transition"
          >
            Login
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-1 h-px bg-gray-300 dark:bg-gray-600"></div>
          <span className="px-3 text-sm text-gray-400">OR</span>
          <div className="flex-1 h-px bg-gray-300 dark:bg-gray-600"></div>
        </div>

        {/* Signup */}
        <p className="text-center text-sm text-gray-600 dark:text-gray-400">
          Don’t have an account?{" "}
          <Link
            to="/signup"
            className="text-[#d6336c] font-semibold hover:underline"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;


