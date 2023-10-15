import { useEffect, useState } from "react";
import { API_URL, loginBg_URL } from "../helper";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { loginAction } from "../redux/action/accountAction";

const LandingPageLogin = () => {
  const [inUsername, setInUsername] = useState("");
  const [inPassword, setInPassword] = useState("");
  const [inEmail, setInEmail] = useState("");
  const hasRegisterGlobal = useSelector((state) => state.hasRegisterReducer);
  const accountGlobal = useSelector((state) => state.accountReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const displayHasRegister = () => {
    if (hasRegisterGlobal === true) {
      return (
        <p className=" text-white text-sm">
          Your account have been registered. Now you can login
        </p>
      );
    } else {
      return <div className=" h-5"></div>;
    }
  };
  const onLogin = () => {
    axios
      .get(API_URL + `/account?username=${inUsername}&password=${inPassword}`)
      .then((response) => {
        console.log("check user", response.data);
        if (!response.data.length) {
          alert("Account Is Not Registered");
        } else {
          localStorage.setItem("dataAccount", JSON.stringify(response.data[0]));
          dispatch(loginAction(response.data[0]));
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    if (accountGlobal.username && accountGlobal.password) {
      navigate("/");
    }
  }, [accountGlobal]);
  useEffect(() => {
    if (localStorage.getItem("dataAccount")) {
      navigate("/");
    }
  }, []);
  return (
    <section className="bg-black">
      <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
        <aside className="relative block h-16 lg:col-span-5 lg:h-full xl:col-span-6">
          <img
            alt="Pattern"
            src={loginBg_URL}
            className="absolute inset-0 h-full w-full object-cover"
          />
        </aside>

        <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
          <div className=" flex justify-center content-center flex-col items-center  h-full w-full ">
            <h2 className="text-2xl font-bold leading-7 text-white sm:truncate sm:text-3xl sm:tracking-tight">
              Login to Z
            </h2>
            <form
              className={
                "bg-slate-800 shadow-md shadow-blue-500/50 rounded-md max-h-fit w-10/12 px-8 pt-6 pb-8 mb-4 "
              }
            >
              {displayHasRegister()}
              <div className="mb-4">
                <label
                  className="block text-white text-sm font-bold mb-2"
                  htmlFor="username"
                >
                  Username
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="username"
                  type="text"
                  placeholder="Username"
                  onChange={(e) => {
                    setInUsername(e.target.value);
                  }}
                />
              </div>
              <div className="mb-6">
                <label
                  className="block text-white text-sm font-bold mb-2"
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  className="shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                  id="password"
                  type="password"
                  placeholder="******************"
                  onChange={(e) => {
                    setInPassword(e.target.value);
                  }}
                />
                {inPassword.length <= 0 ? (
                  <p className="text-red-500 text-xs italic">
                    Please enter a password.
                  </p>
                ) : (
                  <div className=" h-4"></div>
                )}
              </div>
              <div className="flex items-center justify-between">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="button"
                  onClick={() => {
                    onLogin();
                  }}
                >
                  Login
                </button>
                <a
                  className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
                  href="#"
                >
                  Forgot Password?
                </a>
              </div>
            </form>
            <div className=" max-w-sm mx-auto text-center mt-12 mb-6">
              <p className=" text-white">
                Don't have an account?{" "}
                <Link
                  to={"/landing/register"}
                  className="font-bold hover:underline"
                >
                  Sign up
                </Link>
                .
              </p>
            </div>
            <p className="text-center text-gray-500 text-xs">
              &copy;2023 H.A.N.S Corp. All rights reserved.
            </p>
          </div>
        </main>
      </div>
    </section>
  );
};

export default LandingPageLogin;
