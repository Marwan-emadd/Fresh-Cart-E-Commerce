import React, { useContext, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";
import { Helmet, HelmetProvider } from "react-helmet-async";

export default function Login() {
  let navigate = useNavigate();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  let { setUserToken } = useContext(UserContext);

  async function loginSubmit(values) {
    console.log(values);
    setError("");
    setIsLoading(true);
    let { data } = await axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/signin", values)
      .catch((err) => {
        setIsLoading(false);
        setError(err.response.data.message);
      });

    if (data.message === "success") {
      setIsLoading(false);
      localStorage.setItem("userToken", data.token);
      setUserToken(data.token);
      navigate("/");
    }
  }

  let validateSchema = yup.object({
    email: yup.string().email("email is invalid").required("email is required"),
    password: yup
      .string()
      .matches(/^[A-Z][a-z0-9]{5,10}$/, "password is invalid")
      .required("password is required"),
  });

  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validateSchema,
    onSubmit: loginSubmit,
  });

  return (
    <HelmetProvider>
      <Helmet>
        <title>Login - Fresh Cart</title>
      </Helmet>
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="w-full max-w-md bg-white rounded-3xl shadow-lg px-8 py-10 sm:px-10">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-14 h-14 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <i className="fa-solid fa-user text-main text-xl"></i>
            </div>
            <h2 className="text-2xl font-bold text-gray-800">Welcome back</h2>
            <p className="text-sm text-gray-400 mt-1">
              Sign in to your account
            </p>
          </div>

          {/* Error */}
          {error ? (
            <div className="flex items-center gap-2 text-sm text-red-600 bg-red-50 border border-red-200 rounded-xl px-4 py-3 mb-5">
              <i className="fa-solid fa-circle-exclamation"></i>
              {error}
            </div>
          ) : null}

          <form onSubmit={formik.handleSubmit} className="flex flex-col gap-5">
            {/* Email */}
            <div className="flex flex-col gap-1">
              <label
                htmlFor="email"
                className="text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                className="p-3 h-11 border border-gray-200 outline-none rounded-xl bg-gray-50 focus:border-main focus:bg-white transition-all duration-200 text-sm"
                name="email"
                placeholder="you@example.com"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.email}
              />
              {formik.errors.email && formik.touched.email ? (
                <div className="text-xs text-red-500 flex items-center gap-1 mt-1">
                  <i className="fa-solid fa-circle-exclamation"></i>
                  {formik.errors.email}
                </div>
              ) : (
                ""
              )}
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1">
              <label
                htmlFor="password"
                className="text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                className="p-3 h-11 border border-gray-200 outline-none rounded-xl bg-gray-50 focus:border-main focus:bg-white transition-all duration-200 text-sm"
                name="password"
                placeholder="••••••••"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.password}
              />
              {formik.errors.password && formik.touched.password ? (
                <div className="text-xs text-red-500 flex items-center gap-1 mt-1">
                  <i className="fa-solid fa-circle-exclamation"></i>
                  {formik.errors.password}
                </div>
              ) : (
                ""
              )}
            </div>

            {/* Submit */}
            <button
              disabled={!(formik.isValid && formik.dirty)}
              type="submit"
              className="w-full h-11 mt-2 bg-main text-white text-sm font-semibold rounded-xl hover:opacity-80 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
            >
              {isLoading ? <i className="fas fa-spinner fa-spin"></i> : "Login"}
            </button>

            <Link
              to="/register"
              className="text-center text-sm text-gray-500 hover:text-main transition-colors duration-200"
            >
              Don't have an account?{" "}
              <span className="text-main font-medium hover:underline">
                Register
              </span>
            </Link>
          </form>
        </div>
      </div>
    </HelmetProvider>
  );
}
