import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import { useState } from "react";
import axios from "axios";
import { URL } from "../url";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const res = await axios.post(URL + "/api/auth/register", {
        username,
        email,
        password,
      });
      setUsername(res.data.username);
      setEmail(res.data.email);
      setPassword(res.data.password);
      setError(false);
      console.log(username, email, password);
      navigate("/login");
    } catch (err) {
      setError(true);
      console.log(err);
    }
  };

  return (
    <div >

      <div className="flex items-center justify-between px-6 md:px-[200px] py-4">
        <h1 className="text-lg md:text-xl font-extrabold">
          <Link to="/">Cultural Exchange</Link>
        </h1>
        <h3>
          <Link to="/login">Login</Link>
        </h3>
      </div>

      <div className="md:min-h-[80vh] px-8 md:px-[200px] mt-8 flex md:flex-row flex-col-reverse md:items-start items-start">
      {/* <div className="py-6 flex flex-col justify-center sm:py-12"> */}

        <div className="relative py-3 sm:max-w-xl sm:mx-auto mt-8">
          <div className="absolute inset-0 bg-gradient-to-r from-tertiary to-btn shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
          {/* <div className="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div> */}
          <div className="relative mx-4 md:mx-0 px-4 py-10 bg-txt shadow-lg sm:rounded-3xl sm:p-20">
            <div className="max-w-md mx-auto">
              <div>
                <h1 className="text-2xl font-semibold">Create a new account</h1>
              </div>
              <div className="divide-y divide-gray-200">
                <div className="py-8 text-base leading-6 space-y-6 text-gray-700 sm:text-lg sm:leading-7">
                  <div className="relative">
                    <input
                      autoComplete="off"
                      type="text"
                      onChange={(e) => setUsername(e.target.value)}
                      className="text-sm peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-gray-600"
                      // placeholder="Username"
                    />
                    <label
                      htmlFor="textField"
                      className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                    >
                      Username
                    </label>
                  </div>

                  <div className="relative">
                    <input
                      autoComplete="off"
                      type="text"
                      onChange={(e) => setEmail(e.target.value)}
                      className="text-sm peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-gray-600"
                      // placeholder="Email address"
                    />
                    <label
                      htmlFor="email"
                      className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                    >
                      Email Address
                    </label>
                  </div>

                  <div className="relative">
                    <input
                      autoComplete="off"
                      onChange={(e) => setPassword(e.target.value)}
                      type="password"
                      className="text-sm peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-gray-600"
                      // placeholder="Password"
                    />
                    <label
                      htmlFor="password"
                      className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                    >
                      Password
                    </label>
                  </div>
                  <div className="relative">
                    <button
                      onClick={handleRegister}
                      className="w-full bg-btn text-txt rounded-md px-3 py-2"
                    >
                      Create Account
                    </button>
                    {error && (
                      <h3 className="text-red-500 text-sm justify-center items-center flex">
                        Something went wrong
                      </h3>
                    )}
                    <div className="flex text-sm justify-center items-center space-x-2 space-y-1">
                      <p>Already have an account?</p>
                      <p className="text-primary hover:text-tertiary font-bold">
                        <Link to="/login">Login</Link>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <div className="w-full flex justify-center items-center h-[80vh] ">
        <div className="flex flex-col justify-center items-center space-y-4 w-[80%] md:w-[25%]">
          <h1 className="text-xl font-bold text-left">Create an account</h1>
          <input
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-2 border-2 border-black outline-0"
            type="text"
            placeholder="Enter your username"
          />
          <input
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border-2 border-black outline-0"
            type="text"
            placeholder="Enter your email"
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border-2 border-black outline-0"
            type="password"
            placeholder="Enter your password"
          />
          <button
            onClick={handleRegister}
            className="w-full px-4 py-4 text-lg font-bold text-white bg-black rounded-lg hover:bg-gray-500 hover:text-black "
          >
            Register
          </button>
          {error && (
            <h3 className="text-red-500 text-sm ">Something went wrong</h3>
          )}
          <div className="flex justify-center items-center space-x-3">
            <p>Already have an account?</p>
            <p className="text-gray-500 hover:text-black">
              <Link to="/login">Login</Link>
            </p>
          </div>
        </div>
      </div> */}

      <Footer />
    </div>
  );
};

export default Register;
