"use client";

import Loading from "@/app/components/Loading";
import { register } from "@/app/services/AuthService";
import { getErrorResponse } from "@/app/utils/getErrorResponse";
import { useFormik } from "formik";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useMutation } from "react-query";
import * as Yup from "yup";

const RegisterForm = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const mutation = useMutation(register, {
    onSuccess: (data) => {
      if (data?.message === "User already exists") {
        setErrorMessage(data?.message);
      } else {
        // User has been created successfully
        router.push("/login");
      }
    },
    onError: (error) => {
      console.log("error regiter", error);
      setErrorMessage(getErrorResponse(error));
    },
  });

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Username is Required"),
      email: Yup.string().required("Email is Required").email("Email must be a valid email"),
      password: Yup.string().required("Password is Required"),
      confirmPassword: Yup.string()
        .required("Confirm Password is Required")
        .oneOf([Yup.ref("password")], "Password must match"),
    }),
    onSubmit: (values) => {
      setErrorMessage("");
      const registerData = {
        email: values.email,
        username: values.username,
        password: values.password,
      };
      mutation.mutate(registerData);
    },
  });

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <form className="w-full" onSubmit={formik.handleSubmit}>
      <h1 className="text-2xl mb-6">Register</h1>
      <div className="form-group mb-4">
        <input
          type="email"
          className="form-control"
          placeholder="Enter Email"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
        />
        <div className="text-red-500">{formik.touched.email && formik.errors.email ? <div>{formik.errors.email}</div> : null}</div>
      </div>
      <div className="form-group mb-4">
        <input
          type="text"
          className="form-control"
          placeholder="Create Username"
          name="username"
          value={formik.values.username}
          onChange={formik.handleChange}
        />
        <div className="text-red-500">{formik.touched.username && formik.errors.username ? <div>{formik.errors.username}</div> : null}</div>
      </div>
      <div className="form-group mb-4 relative">
        <input
          type={showPassword ? "text" : "password"}
          className="form-control"
          placeholder="Create Password"
          name="password"
          value={formik.values.password}
          onChange={formik.handleChange}
        />
        {showPassword ? (
          <Eye className="absolute right-4 top-4 cursor-pointer" onClick={handleShowPassword} />
        ) : (
          <EyeOff className="absolute right-4 top-4 cursor-pointer" onClick={handleShowPassword} />
        )}
        <div className="text-red-500">{formik.touched.password && formik.errors.password ? <div>{formik.errors.password}</div> : null}</div>
      </div>
      <div className="form-group mb-4 relative">
        <input
          type={showConfirmPassword ? "text" : "password"}
          className="form-control"
          placeholder="Confirm Password"
          name="confirmPassword"
          value={formik.values.confirmPassword}
          onChange={formik.handleChange}
        />
        {showConfirmPassword ? (
          <Eye className="absolute right-4 top-4 cursor-pointer" onClick={handleShowConfirmPassword} />
        ) : (
          <EyeOff className="absolute right-4 top-4 cursor-pointer" onClick={handleShowConfirmPassword} />
        )}
        <div className="text-red-500">
          {formik.touched.confirmPassword && formik.errors.confirmPassword ? <div>{formik.errors.confirmPassword}</div> : null}
        </div>
      </div>
      {errorMessage && <div className="text-red-500">{errorMessage}</div>}
      <button type="submit" disabled={mutation.isLoading} className="button-primary mt-6 mb-10">
        {mutation.isLoading ? <Loading /> : "Register"}
      </button>
      <p className="text-center">
        Have an account?{" "}
        <Link href="/login" className="underline text-transparent bg-clip-text bg-gradient-golden">
          Login here
        </Link>
      </p>
    </form>
  );
};
export default RegisterForm;
