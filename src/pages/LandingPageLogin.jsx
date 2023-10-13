import { useEffect, useState } from "react";
import { API_URL } from "../helper";
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
      return <h1>You have registered. Now you can Login</h1>;
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
  return (
    <div className=" w-screen flex justify-center content-center flex-col items-center">
      <form className={"bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"}>
        {displayHasRegister()}
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
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
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="******************"
            onChange={(e) => {
              setInPassword(e.target.value);
            }}
          />
          <p className="text-red-500 text-xs italic">
            Please enter a password.
          </p>
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
      <div className="max-w-lg mx-auto text-center mt-12 mb-6">
        <p className=" text-black">
          Don't have an account?{" "}
          <Link to={"/landing/register"} className="font-bold hover:underline">
            Sign up
          </Link>
          .
        </p>
      </div>
      <p className="text-center text-gray-500 text-xs">
        &copy;2023 H.A.N.S Corp. All rights reserved.
      </p>
    </div>
  );
};

export default LandingPageLogin;
