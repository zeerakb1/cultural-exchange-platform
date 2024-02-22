import { Link } from "react-router-dom";

const Register = () => {
  return (
    <div className="w-full flex justify-center items-center h-[80vh] ">
      <div className="flex flex-col justify-center items-center space-y-4 w-[80%] md:w-[25%]">
        <h1 className="text-xl font-bold text-left">Create an account</h1>
        <input
          onChange={() => {}}
          className="w-full px-4 py-2 border-2 border-black outline-0"
          type="text"
          placeholder="Enter your username"
        />
        <input
          onChange={() => {}}
          className="w-full px-4 py-2 border-2 border-black outline-0"
          type="text"
          placeholder="Enter your email"
        />
        <input
          onChange={() => {}}
          className="w-full px-4 py-2 border-2 border-black outline-0"
          type="password"
          placeholder="Enter your password"
        />
        <button
          onClick={() => {}}
          className="w-full px-4 py-4 text-lg font-bold text-white bg-black rounded-lg hover:bg-gray-500 hover:text-black "
        >
          Register
        </button>
        <div className="flex justify-center items-center space-x-3">
          <p>Already have an account?</p>
          <p className="text-gray-500 hover:text-black">
            <Link to="/login">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
