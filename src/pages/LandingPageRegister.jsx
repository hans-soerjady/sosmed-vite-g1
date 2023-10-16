import { useEffect, useState } from "react";
import { API_URL, loginBg_URL } from "../helper";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { hasRegisterAction } from "../redux/action/hasRegisterAction";

const LandingPageRegister = () => {
  const [inUsername, setInUsername] = useState("");
  const [inPassword, setInPassword] = useState("");
  const [inEmail, setInEmail] = useState("");
  const [inPasswordConfirm, setInPasswordConfirm] = useState("");
  const dispatch = useDispatch();
  const hasRegisterGlobal = useSelector((state) => state.hasRegisterReducer);
  const [existingUsername, setExistingUsername] = useState(false);
  const [existingEmail, setExistingEmail] = useState(false);

  const getAccountUsername = () => {
    axios
      .get(API_URL + `/account?username=${inUsername}`)
      .then((response) => {
        console.log(response.data);
        if (response.data.length > 0) {
          console.log("username req", response.data);
          setExistingUsername(true);
          console.log(existingUsername);
        } else {
          setExistingUsername(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getAccountEmail = () => {
    axios
      .get(API_URL + `/account?email=${inEmail}`)
      .then((response) => {
        console.log(response);
        if (response.data.length) {
          setExistingEmail(true);
        } else {
          setExistingEmail(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const navigate = useNavigate();
  const saveRegister = async () => {
    if (inUsername && inEmail && inPassword) {
      if (inPassword.length < 7) {
        alert(` Error!!\n Password must contain 8 or more characters`);
      } else if (!inEmail.includes("@")) {
        alert(` Error!!\ ${inEmail} is not a valid email`);
      } else {
        try {
          const response = await Promise.all(
            [axios.get(API_URL + `/account?username=${inUsername}`)],
            [axios.get(API_URL + `/account?email=${inEmail}`)]
          );
          const dataRes = response.map((response) => response.data);
          console.log("This is Data", dataRes);
          if (!dataRes[0].length) {
            try {
              await axios.post(API_URL + `/account`, {
                username: inUsername,
                email: inEmail,
                password: inPassword,
                img: "",
              });

              dispatch(hasRegisterAction(true));
              navigate("/landing/login");
            } catch (error) {
              console.log(error);
            }
          } else {
            return alert(
              `Error!!\nEither your Email or Username has been used`
            );
          }
        } catch (error) {
          console.log(error);
        }
      }
    } else {
      return alert("Please fill all information");
    }
  };

  useEffect(() => {
    getAccountUsername();
  }, [inUsername]);
  useEffect(() => {
    getAccountEmail();
  }, [inEmail]);
  console.log(inPasswordConfirm === inPassword);
  return (
    <section className="bg-black">
      <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
        <aside className="relative block h-16  lg:col-span-5 lg:h-full xl:col-span-6">
          <img
            alt="Pattern"
            src={loginBg_URL}
            className="absolute inset-0 h-full w-full object-cover"
          />
        </aside>
        <main className="flex items-center justify-center px-8 py-8 sm:px-8 lg:col-span-7 lg:px-16 lg:py-8 xl:col-span-6">
          <div className="flex justify-center content-center flex-col items-center  h-full w-full ">
            <h2 className="text-2xl font-bold leading-7 text-white sm:truncate sm:text-3xl sm:tracking-tight">
              Join Us Now
            </h2>
            <form className="bg-slate-800 shadow-md shadow-blue-500/50 rounded-md max-h-fit w-10/12 px-8 pt-6 pb-8 mb-4 ">
              <div className="mb-3">
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
                {existingUsername ? (
                  <p className="text-red-500 text-xs italic">
                    This username has been used.
                  </p>
                ) : (
                  <div className=" h-4"></div>
                )}
              </div>
              <div className="mb-3">
                <label
                  className="block text-white text-sm font-bold mb-2"
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
                {existingEmail ? (
                  <p className="text-red-500 text-xs italic">
                    This email has been used.
                  </p>
                ) : (
                  <div className=" h-4"></div>
                )}
              </div>
              <div className="mb-3">
                <label
                  className="block text-white text-sm font-bold mb-2"
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                  id="password"
                  type="password"
                  placeholder="********"
                  onChange={(e) => {
                    setInPassword(e.target.value);
                  }}
                />
                {inPassword.length <= 7 ? (
                  <p className="text-red-500 text-xs italic">
                    Please enter at least 8 characters
                  </p>
                ) : (
                  <div className=" h-4"></div>
                )}
              </div>
              <div className="mb-3">
                <label
                  className="block text-white text-sm font-bold mb-2"
                  htmlFor="confirmPassword"
                >
                  Confirm Password
                </label>
                <input
                  className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                  id="confirmPassword"
                  type="password"
                  placeholder="********"
                  onChange={(e) => {
                    setInPasswordConfirm(e.target.value);
                  }}
                />
                {!(inPassword === inPasswordConfirm) ? (
                  <p className="text-red-500 text-xs italic">
                    Passwords do not MATCH.
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
                    saveRegister();
                  }}
                >
                  Register
                </button>
              </div>
            </form>
            <div className=" max-w-sm mx-auto text-center mt-12 mb-6">
              <p className=" text-white">
                Already have an account?{" "}
                <Link
                  to={"/landing/login"}
                  className="font-bold hover:underline"
                >
                  Sign in
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

export default LandingPageRegister;
