import { useContext, useEffect, useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import ProfilePosts from "../components/ProfilePosts";
import axios from "axios";
import { URL } from "../url";
import { UserContext } from "../context/UserContext";
import { useNavigate, useParams } from "react-router-dom";

const Profile = () => {
  const param = useParams().id;
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [updated, setUpdated] = useState(false);

  useEffect(() => {
      fetchProfile();
      fetchUserPosts();
  }, [param, user])

  const fetchProfile = async () => {
    try {
      const res = await axios.get(URL + "/api/users/" + user._id);
      setUsername(res.data.username);
      setEmail(res.data.email);
      setPassword(res.data.password);
    } catch (err) {
      console.log(err);
    }
  };

  const handleUserUpdate = async () => {
    setUpdated(false);
    try {
      const res = await axios.put(
        URL + "/api/users/" + user._id,
        { username, email, password },
        { withCredentials: true }
      );
      console.log(res.data);
      setUpdated(true);
    } catch (err) {
      console.log(err);
      setUpdated(false);
    }
  };

  const handleUserDelete = async () => {
    try {
      const res = await axios.delete(URL + "/api/users/" + user._id, {
        withCredentials: true,
      });
      setUser(null);
      navigate("/");
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchUserPosts = async () => {
    try {
      const res = await axios.get(URL + "/api/posts/user/" + user._id);
      console.log(res.data, "USER POSTS");
      setPosts(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // useEffect(() => {
  //   fetchProfile();
  // }, [param]);

  // useEffect(() => {
  //   fetchUserPosts();
  // }, [param]);

  return (
    <div>
      <Navbar />
      <div className="md:min-h-[80vh] px-8 md:px-[200px] mt-8 flex md:flex-row flex-col-reverse md:items-start items-start">
        <div className="flex flex-col md:w-[50%] xl:w-[70%] mt-8 md:mt-0 sm:px-0">
          {posts.length != 0 ? (
            <div>
              <h1 className="text-xl font-bold mb-4">Your posts:</h1>
              {posts?.map((p) => (
                <ProfilePosts key={p._id} p={p} />
              ))}
            </div>
          ) : (
            <h1 className="text-xl font-bold mb-4">No posts available</h1>
          )}
        </div>

        <div className="w-full bg-txt overflow-auto shadow rounded-lg border md:items-end md:sticky md:top-12 justify-start md:justify-end md:ml-10 md:w-[50%] xl:w-[30%]">
          <div className="px-4 py-5 sm:px-6 bg-tertiary">
            <h3 className="text-lg leading-6 font-medium text-txt">Profile</h3>
          </div>
          <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
            <dl className="sm:divide-y sm:divide-gray-200">
              <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Full name</dt>
                <dd className="text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {/* John Doe */}
                  <input
                    onChange={(e) => setUsername(e.target.value)}
                    value={username}
                    placeholder="Your username"
                    type="text"
                  />
                </dd>
              </div>
              <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  Email address
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {/* johndoe@example.com */}
                  <input
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    placeholder="Your email"
                    type="email"
                  />
                </dd>
              </div>
              <dd className="py-3 sm:py-5 lg:px-6 justify-between">
                <div className="flex items-center space-x-10 sm:space-x-4 xl:space-x-10 rounded-lg">
                  <button
                    onClick={handleUserUpdate}
                    className="text-txt font-semibold bg-btn px-8 py-2 hover:bg-primary"
                  >
                    Update
                  </button>
                  <button
                    onClick={handleUserDelete}
                    className="text-txt font-semibold bg-btn px-8 py-2 hover:bg-primary"
                  >
                    Delete
                  </button>
                </div>
              </dd>
            </dl>
          </div>
          {updated && (
            <h3 className="text-green-500 text-sm text-center mt-4">
              User updated successfully!
            </h3>
          )}
        </div>

        {/* <div className="md:sticky md:top-12  flex justify-start md:justify-end items-start md:w-[30%] w-full md:items-end ">
          <div className=" flex flex-col space-y-4 items-start">
            <h1 className="text-xl font-bold mb-4">Profile</h1>
            <input
              onChange={(e) => setUsername(e.target.value)}
              value={username}
              className="outline-none px-4 py-2 text-gray-500"
              placeholder="Your username"
              type="text"
            />
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="outline-none px-4 py-2 text-gray-500"
              placeholder="Your email"
              type="email"
            />

            <div className="flex items-center space-x-4 mt-8">
              <button
                onClick={handleUserUpdate}
                className="text-white font-semibold bg-black px-4 py-2 hover:text-black hover:bg-gray-400"
              >
                Update
              </button>
              <button
                onClick={handleUserDelete}
                className="text-white font-semibold bg-black px-4 py-2 hover:text-black hover:bg-gray-400"
              >
                Delete
              </button>
            </div>
            {updated && (
              <h3 className="text-green-500 text-sm text-center mt-4">
                user updated successfully!
              </h3>
            )}
          </div>
        </div> */}
      </div>

      <Footer />
    </div>
  );
};

export default Profile;
