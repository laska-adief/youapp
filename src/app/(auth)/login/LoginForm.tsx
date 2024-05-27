"use client";

import Loading from "@/app/components/Loading";
import { login } from "@/app/services/AuthService";
import useProfileStore from "@/app/store/ProfileStore";
import { getErrorResponse } from "@/app/utils/getErrorResponse";
import { useFormik } from "formik";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useMutation } from "react-query";
import * as Yup from "yup";

const LoginForm = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { setAccessToken, setIsLogin } = useProfileStore();

  const mutation = useMutation(login, {
    onSuccess: (data) => {
      if (data.access_token) {
        setAccessToken(data.access_token);
        setIsLogin(true);
        router.push("/");
      } else {
        setErrorMessage("Incorrect Email or Password");
      }
    },
    onError: (error) => {
      console.log("error login", error);
      setErrorMessage(getErrorResponse(error));
    },
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      username: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Email/Username is Required"),
      password: Yup.string().required("Password is Required"),
    }),
    onSubmit: (values) => {
      const loginData = { ...values, email: values.username };
      mutation.mutate(loginData);
    },
  });

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <form className="w-full" onSubmit={formik.handleSubmit}>
      <h1 className="text-2xl mb-6">Login</h1>
      <div className="form-group mb-4">
        <input
          type="text"
          className="form-control"
          placeholder="Enter Email/Username"
          name="username"
          value={formik.values.username}
          onChange={formik.handleChange}
        />
        <div className="text-red-500">{formik.touched.username && formik.errors.username ? <div>{formik.errors.username}</div> : null}</div>
      </div>
      <div className="form-group relative mb-4">
        <input
          type={showPassword ? "text" : "password"}
          className="form-control"
          placeholder="Enter Password"
          name="password"
          value={formik.values.password}
          onChange={formik.handleChange}
        />
        {showPassword ? (
          <Eye className="absolute right-4 top-4 cursor-pointer" onClick={handleShowPassword} />
        ) : (
          <EyeOff className="absolute right-4 top-4 cursor-pointer" onClick={handleShowPassword} />
        )}
        <div className="text-red-500">
          {formik.touched.password && formik.errors.password ? <div>{formik.errors.password}</div> : null}{" "}
        </div>
      </div>
      {errorMessage && <div className="text-red-500">{errorMessage}</div>}
      <button type="submit" className="button-primary mt-6 mb-10">
        {mutation.isLoading ? <Loading /> : "Login"}
      </button>
      <p className="text-center">
        No account?{" "}
        <Link href="/register" className="underline text-transparent bg-clip-text bg-gradient-golden">
          Register here
        </Link>
      </p>
    </form>
  );
};
export default LoginForm;
