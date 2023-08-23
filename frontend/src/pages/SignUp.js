import React, { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerUserAction } from "../redux/slices/users/userSlices";
import { logoutUserAction } from "../redux/slices/users/userSlices";

//-------------------------------
//Register
//-------------------------------
const SignUp = () => {
  const navigate = useNavigate();
  //dispath
  const dispatch = useDispatch();
  //select state from store

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  //---Destructuring---
  const { firstName, lastName, email, password } = formData;

  //---onchange handler----
  const onChangeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  //---onsubmit handler----
  const onSubmitHandler = (e) => {
    if (user) {
      dispatch(logoutUserAction());
      console.log(user);
    } else {
      const values = { firstName, lastName, email, password };
      e.preventDefault();
      dispatch(registerUserAction(values));
    }
  };

  const storeData = useSelector((store) => store?.users);
  const { loading, appErr, serverErr, user } = storeData;

  //redirect
  useEffect(() => {
    if (user) {
      navigate("/login");
      console.log(user);
    }
  }, [user, navigate]);
  // logout

  return (
    <section className="relative py-3 2xl:py-40 bg-gray-800 overflow-hidden">
      <div className="relative container px-4 mx-auto">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-wrap items-center -mx-4">
            <div className="w-full lg:w-1/2 px-4 mb-16 lg:mb-0">
              <div className="max-w-md">
                <h4 className="mt-1 mb-1 text-2xl font-bold font-heading text-white">
                  Create an account and start to pen down your ideas
                </h4>
              </div>
            </div>
            <div className="w-full lg:w-1/2 px-4">
              <div className="px-6 lg:px-20 py-2 lg:py-24 bg-gray-600 rounded-lg">
                <form onSubmit={onSubmitHandler}>
                  <h3 className="mb-2 text-center text-2xl text-white font-bold font-heading">
                    Register Account
                    {/* display error message*/}
                    {appErr || serverErr ? (
                      <div className="text-red-400">
                        {serverErr} {appErr}
                      </div>
                    ) : null}
                  </h3>

                  {/* First name */}
                  <div className="flex items-center pl-6 mb-2 bg-white rounded-full">
                    <input
                      name="firstName"
                      value={firstName}
                      onChange={onChangeHandler}
                      className="w-full pl-4 pr-6 py-4 h-5 font-bold placeholder-gray-300 rounded-r-full focus:outline-none"
                      type="firstName"
                      placeholder="First Name"
                      required
                    />
                  </div>
                  {/* Err msg*/}
                  <div className="text-red-400 mb-2"></div>
                  {/* Last name */}
                  <div className="flex items-center pl-6 mb-3 bg-white rounded-full">
                    <input
                      name="lastName"
                      value={lastName}
                      onChange={onChangeHandler}
                      className="w-full h-4 pl-4 pr-6 py-4 font-bold placeholder-gray-300 rounded-r-full focus:outline-none"
                      type="lastName"
                      placeholder="Last Name"
                      required
                    />
                  </div>
                  {/* Err msg*/}
                  {/* Email */}
                  <div className="flex items-center  pl-6 mb-3 bg-white rounded-full">
                    <input
                      name="email"
                      value={email}
                      onChange={onChangeHandler}
                      className="w-full pl-4 h-5 pr-6 py-4 font-bold placeholder-gray-300 rounded-r-full focus:outline-none"
                      type="email"
                      placeholder="example@gmail.com"
                      required
                    />
                  </div>
                  <div className="flex items-center pl-6 mb-3 bg-white rounded-full">
                    <input
                      name="password"
                      value={password}
                      onChange={onChangeHandler}
                      className="w-full pl-4 h-5 pr-6 py-4 font-bold placeholder-gray-300 rounded-r-full focus:outline-none"
                      type="password"
                      placeholder="Password"
                      required
                    />
                  </div>
                  {/* Err msg*/}
                  <div className="text-red-400 mb-2"></div>

                  <div className="inline-flex mb-10"></div>

                  {/* Check for loading */}
                  {loading ? (
                    <button
                      disabled
                      className="py-4 w-full bg-gray-500  text-white font-bold rounded-full transition duration-200"
                    >
                      loading please wait...
                    </button>
                  ) : (
                    <button
                      type="submit"
                      className="w-full h-8 bg-blue-500  items-center hover:bg-blue-600 mx-auto  text-white font-bold rounded-full transition duration-200"
                    >
                      Register
                    </button>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
