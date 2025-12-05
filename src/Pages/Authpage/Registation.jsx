import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router";
import useAuth from "../../Hook/useAuth";
import axios from "axios";
import { toast } from "react-toastify";
import useGoogolelogin from "../../Hook/useGoogolelogin";

const Registation = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { singupuser, updateprofile } = useAuth();
  const handlegooglelogin = useGoogolelogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleregister = (data) => {
    const profilephoto = data.photo[0];

    singupuser(data.email, data.password)
      .then((res) => {
        console.log(res.user);

        //store from-img

        const fromdata = new FormData();
        fromdata.append("image", profilephoto);

        const imguri = `https://api.imgbb.com/1/upload?key=${
          import.meta.env.VITE_IMG_HOST_KEY
        }`;

        axios
          .post(imguri, fromdata)
          .then((result) => {
            console.log(result.data.data.url);
            const profileimage = result.data.data.url;

            const updateprofiledata = {
              displayName: data.name,
              photoURL: profileimage,
            };

            updateprofile(updateprofiledata)
              .then(() => {
                // console.log("profile update done !!");
                toast.success("you singup succesfull !!");
              })
              .catch(() => {
                toast.error("something went wrong !!");
              });
          })
          .catch((error) => console.log(error));
      })
      .catch((error) => console.log(error));
  };


  /* const handlegoolelogin = () => {
    useGoogolelogin()
  } */

  return (
    <div>
      <div className="min-h-screen flex items-center justify-center p-4  ">
        <div className="bg-gray-800 w-full max-w-md p-8 rounded-2xl shadow-2xl border border-gray-700">
          <h2 className="text-3xl font-bold text-center text-teal-400 mb-2">
            Create your account
          </h2>

          <p className="text-center text-sm text-gray-400 mb-6">
            Already have an account?
            <Link to="/login" className="text-blue-400 hover:underline">
              {" "}
              Login here
            </Link>
          </p>

          {/* FORM */}
          <form onSubmit={handleSubmit(handleregister)} className="space-y-5">
            {/* Name */}
            <div>
              <label className="text-gray-300 text-sm">Full Name</label>
              <input
                type="text"
                placeholder="Enter your name"
                className="w-full mt-1 bg-gray-900 border border-gray-700 text-gray-200 px-4 py-3 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none"
                {...register("name", { required: true })}
              />
            </div>
            {errors.name?.type === "required" && (
              <p className="text-red-500 text-xs">Name is required</p>
            )}

            {/* Email */}
            <div>
              <label className="text-gray-300 text-sm">Email address</label>
              <input
                type="email"
                placeholder="Enter email address"
                className="w-full mt-1 bg-gray-900 border border-gray-700 text-gray-200 px-4 py-3 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none"
                {...register("email", { required: true })}
              />
            </div>

            {errors.email?.type === "required" && (
              <p className="text-red-500 text-xs">email is requered</p>
            )}

            {/* Photo Upload */}
            <div>
              <label className="text-gray-300 text-sm">Profile Photo</label>
              <input
                type="file"
                accept="image/*"
                className="w-full mt-1 bg-gray-900 border border-gray-700 text-gray-300 px-4 py-2 rounded-lg cursor-pointer"
                {...register("photo", { required: true })}
              />
            </div>

            {errors.photo?.type === "required" && (
              <p className="text-red-500 text-xs">photo is requered</p>
            )}

            {/* Password */}
            <div>
              <label className="text-gray-300 text-sm">Password</label>

              <div className="relative mt-1">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter Password"
                  className="w-full bg-gray-900 border border-gray-700 text-gray-200 px-4 py-3 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none"
                  {...register("password", {
                    required: true,
                    minLength: 6,
                    pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).+$/,
                  })}
                />

                {errors.password?.type == "required" && (
                  <p className="text-red-500 text-xs">password is required</p>
                )}
                {errors.password?.type === "minLength" && (
                  <p className="text-red-500 text-xs">
                    Password must be at least 6 characters
                  </p>
                )}
                {errors.password?.type === "pattern" && (
                  <p className="text-red-500 text-xs">
                    {" "}
                    Password must include lowercase, uppercase, number & special
                    character
                  </p>
                )}

                {/* Eye Toggle */}
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-200"
                >
                  {showPassword ? (
                    // Eye Closed
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                        d="M3 3l18 18M10.477 10.477A3 3 0 0113.5 12.5m3.335 3.335C15.57 17.39 13.852 18 12 18c-4.64 0-8.577-3.01-9.964-7.183a1.012 1.012 0 010-.639A11.955 11.955 0 017.91 6.313"
                      />
                    </svg>
                  ) : (
                    // Eye Open
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                        d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.64 0 8.577 3.01 9.964 7.183.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.64 0-8.577-3.01-9.964-7.183z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Register Button */}
            <button className="w-full bg-orange-600 hover:bg-orange-700 text-white py-3 rounded-lg font-semibold transition">
              Register
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center my-6">
            <div className="flex-grow border-t border-gray-600"></div>
            <span className="px-3 text-gray-400 text-sm">OR</span>
            <div className="flex-grow border-t border-gray-600"></div>
          </div>

          {/* Google Login */}
          <button onClick={  handlegooglelogin} className="w-full border border-gray-700 text-gray-200 py-3 rounded-lg flex justify-center items-center gap-2 hover:bg-gray-700 transition">
            <img
              src="https://www.svgrepo.com/show/355037/google.svg"
              className="w-5"
              alt="google"
            />
            Continue with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default Registation;
