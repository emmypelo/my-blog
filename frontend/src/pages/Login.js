// ... (import statements and useLogin hook)
import React, { useEffect } from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import useLogin from "../hooks/useLogin";

const formSchema = Yup.object({
  email: Yup.string().required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const LoginPage = () => {
  const navigate = useNavigate();
  const { userAuth, loading, appErr, serverErr, handleLogin } = useLogin();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: handleLogin,
    validationSchema: formSchema,
  });

  useEffect(() => {
    if (userAuth) {
      navigate("/add-category");
    }
  }, [userAuth, navigate]);

  return (
    <section className="relative py-8 2xl:py-40 bg-gray-800 overflow-hidden">
      <div className="relative container px-4 mx-auto">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-wrap items-center -mx-4">
            <div className="w-full lg:w-1/2 px-4 mb-4 lg:mb-0">
              <div className="max-w-md">
                <h2 className="text-5xl font-bold font-heading text-white">
                  Login
                </h2>
              </div>
            </div>
            <div className="w-full lg:w-1/2 px-4">
              <div className="px-6 lg:px-20 py-2 lg:py-24 bg-gray-600 rounded-lg">
                <form onSubmit={formik.handleSubmit}>
                  <h3 className="mb-10 text-2xl text-white font-bold font-heading">
                    {appErr || serverErr ? (
                      <div className="text-red-400">
                        {serverErr} {appErr}
                      </div>
                    ) : null}
                  </h3>
                  <div className="flex items-center pl-6 mb-3 bg-white rounded-full">
                    <input
                      value={formik.values.email}
                      onChange={formik.handleChange("email")}
                      onBlur={formik.handleBlur("email")}
                      className="w-full pl-4 pr-6 py-4 font-bold placeholder-gray-300 rounded-r-full focus:outline-none"
                      type="email"
                      placeholder="example@gmail.com"
                    />
                  </div>
                  <div className="text-red-400 mb-2">
                    {formik.touched.email && formik.errors.email}
                  </div>
                  <div className="flex items-center pl-6 mb-3 bg-white rounded-full">
                    <input
                      value={formik.values.password}
                      onChange={formik.handleChange("password")}
                      onBlur={formik.handleBlur("password")}
                      className="w-full pl-4 pr-6 py-4 font-bold placeholder-gray-300 rounded-r-full focus:outline-none"
                      type="password"
                      placeholder="Password"
                    />
                  </div>
                  <div className="text-red-400 mb-2">
                    {formik.touched.password && formik.errors.password}
                  </div>
                  <div className="inline-flex mb-10"></div>
                  {loading ? (
                    <button
                      disabled
                      className="py-4 w-full bg-gray-500 text-white font-bold rounded-full transition duration-200"
                    >
                      loading please wait...
                    </button>
                  ) : (
                    <button
                      type="submit"
                      className="py-4 w-full z-50 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-full transition duration-200"
                    >
                      Sign in
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

export default LoginPage;
