import React, { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";

export default function Register() {
  let navigate = useNavigate();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function registerSubmit(values) {
    console.log(values);
    setError("");
    setIsLoading(true);
    let { data } = await axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/signup", values)
      .catch((err) => {
        setIsLoading(false);
        setError(err.response.data.message);
      });

    if (data.message === "success") {
      setIsLoading(false);
      navigate("/login");
    }
  }

  let phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  let validateSchema = yup.object({
    name: yup
      .string()
      .min(3, "name min length is 3")
      .max(10, "name max length is 10")
      .required("name is required"),
    email: yup.string().email("email is invalid").required("email is required"),
    phone: yup
      .string()
      .matches(phoneRegExp, "phone number is invalid")
      .required("phone number is required"),
    password: yup
      .string()
      .matches(/^[A-Z][a-z0-9]{5,10}$/, "password is invalid")
      .required("password is required"),
    rePassword: yup
      .string()
      .oneOf([yup.ref("password")], "password is not match")
      .required("rePassword is required"),
  });

  let formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      rePassword: "",
    },
    validationSchema: validateSchema,
    onSubmit: registerSubmit,
  });

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>Register - Fresh Cart</title>
        </Helmet>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-10">
          <div className="w-full max-w-lg bg-white rounded-3xl shadow-lg px-8 py-10 sm:px-10">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="w-14 h-14 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <i className="fa-solid fa-user-plus text-main text-xl"></i>
              </div>
              <h2 className="text-2xl font-bold text-gray-800">
                Create account
              </h2>
              <p className="text-sm text-gray-400 mt-1">
                Fill in your details to get started
              </p>
            </div>

            {/* Global Error */}
            {error ? (
              <div className="flex items-center gap-2 text-sm text-red-600 bg-red-50 border border-red-200 rounded-xl px-4 py-3 mb-5">
                <i className="fa-solid fa-circle-exclamation"></i>
                {error}
              </div>
            ) : null}

            <form
              onSubmit={formik.handleSubmit}
              className="flex flex-col gap-4"
            >
              {/* Name */}
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="name"
                  className="text-sm font-medium text-gray-700"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="p-3 h-11 border border-gray-200 outline-none rounded-xl bg-gray-50 focus:border-main focus:bg-white transition-all duration-200 text-sm"
                  name="name"
                  placeholder="John Doe"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.name}
                />
                {formik.errors.name && formik.touched.name ? (
                  <div className="text-xs text-red-500 flex items-center gap-1">
                    <i className="fa-solid fa-circle-exclamation"></i>
                    {formik.errors.name}
                  </div>
                ) : (
                  ""
                )}{" "}
              </div>

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
                  <div className="text-xs text-red-500 flex items-center gap-1">
                    <i className="fa-solid fa-circle-exclamation"></i>
                    {formik.errors.email}
                  </div>
                ) : (
                  ""
                )}{" "}
              </div>

              {/* Phone */}
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="phone"
                  className="text-sm font-medium text-gray-700"
                >
                  Phone
                </label>
                <input
                  type="tel"
                  id="phone"
                  className="p-3 h-11 border border-gray-200 outline-none rounded-xl bg-gray-50 focus:border-main focus:bg-white transition-all duration-200 text-sm"
                  name="phone"
                  placeholder="+20 1XX XXX XXXX"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.phone}
                />
                {formik.errors.phone && formik.touched.phone ? (
                  <div className="text-xs text-red-500 flex items-center gap-1">
                    <i className="fa-solid fa-circle-exclamation"></i>
                    {formik.errors.phone}
                  </div>
                ) : (
                  ""
                )}{" "}
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
                  <div className="text-xs text-red-500 flex items-center gap-1">
                    <i className="fa-solid fa-circle-exclamation"></i>
                    {formik.errors.password}
                  </div>
                ) : (
                  ""
                )}{" "}
              </div>

              {/* rePassword */}
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="rePassword"
                  className="text-sm font-medium text-gray-700"
                >
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="rePassword"
                  className="p-3 h-11 border border-gray-200 outline-none rounded-xl bg-gray-50 focus:border-main focus:bg-white transition-all duration-200 text-sm"
                  name="rePassword"
                  placeholder="••••••••"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.rePassword}
                />
                {formik.errors.rePassword && formik.touched.rePassword ? (
                  <div className="text-xs text-red-500 flex items-center gap-1">
                    <i className="fa-solid fa-circle-exclamation"></i>
                    {formik.errors.rePassword}
                  </div>
                ) : (
                  ""
                )}{" "}
              </div>

              {/* Submit */}
              <button
                disabled={!(formik.isValid && formik.dirty)}
                type="submit"
                className="w-full h-11 mt-2 bg-main text-white text-sm font-semibold rounded-xl hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
              >
                {isLoading ? (
                  <i className="fas fa-spinner fa-spin"></i>
                ) : (
                  "Submit"
                )}
              </button>
            </form>
          </div>
        </div>
      </HelmetProvider>
    </>
  );
}
