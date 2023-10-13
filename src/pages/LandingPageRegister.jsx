import { useEffect, useState } from "react";
import { API_URL } from "../helper";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { hasRegisterAction } from "../redux/action/hasRegisterAction";

const LandingPageRegister = () => {
  const [inUsername, setInUsername] = useState("");
  const [inPassword, setInPassword] = useState("");
  const [inEmail, setInEmail] = useState("");
  const dispatch = useDispatch();
  const hasRegisterGlobal = useSelector((state) => state.hasRegisterReducer);

  const getAccount = () => {
    axios
      .get(API_URL + `/account`)
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const navigate = useNavigate();
  const saveRegister = () => {
    if (inUsername && inEmail && inPassword) {
      axios
        .post(API_URL + `/account`, {
          username: inUsername,
          email: inEmail,
          password: inPassword,
          img: "",
        })
        .then((response) => {
          console.log("POST", response);
          dispatch(hasRegisterAction(true));
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      return alert("Please fill all information");
    }
  };
  useEffect(() => {
    if (hasRegisterGlobal) {
      navigate("/landing/login");
    }
  }, [hasRegisterGlobal]);
  return (
    <div className="w-screen flex justify-center content-center flex-col items-center">
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          {getAccount()}
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
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="text"
            placeholder="Email"
            onChange={(e) => {
              setInEmail(e.target.value);
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
            Please choose a password.
          </p>
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            onClick={() => {
              saveRegister();
            }}
          >
            Register
          </button>
          <button class="inline-flex items-center h-10 px-5 text-indigo-100 transition-colors duration-150 bg-indigo-700 rounded-lg focus:shadow-outline hover:bg-indigo-800">
            <span>With icon</span>
          </button>
        </div>
      </form>
      <p className="text-center text-gray-500 text-xs">
        &copy;2023 H.A.N.S Corp. All rights reserved.
      </p>
    </div>
  );
};

export default LandingPageRegister;
