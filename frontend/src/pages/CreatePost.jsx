import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { IoClose } from "react-icons/io5";
import { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import { URL } from "../url";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { HfInference } from "@huggingface/inference";
const TOKEN_KEY = import.meta.env.VITE_SOME_KEY;

const hf = new HfInference(TOKEN_KEY);

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);
  const { user } = useContext(UserContext);
  const [cat, setCat] = useState("");
  const [cats, setCats] = useState([]);
  const [check, setCheck] = useState(false);

  const navigate = useNavigate();

  const deleteCategory = (i) => {
    let updatedCats = [...cats];
    updatedCats.splice(i);
    setCats(updatedCats);
  };

  const handleRecommendedCats = async (e) => {
    e.preventDefault();
    setCheck(true);
    if (desc !== "") {
      const res = await hf.textGeneration({
        model: "fabiochiu/t5-base-tag-generation",
        inputs: desc,
      });
      let newCats = [...cats, ...res.generated_text.split(",")]
      setCats(newCats)
    }
  }; 

  const addCategory = () => {
    let updatedCats = [...cats];
    updatedCats.push(cat);
    setCat("");
    setCats(updatedCats);
  };


  const handleCreate = async (e) => {
    e.preventDefault();
    const post = {
      title,
      desc,
      username: user.username,
      userId: user._id,
      categories: cats,
    };

    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("img", filename);
      data.append("file", file);
      post.photo = filename;

      // img upload
      try {
        const imgUpload = await axios.post(URL + "/api/upload", data);
        console.log(imgUpload.data);
      } catch (err) {
        console.log(err);
      }
    }

    // post upload
    try {
      const res = await axios.post(URL + "/api/posts/create", post, {
        withCredentials: true,
      });
      navigate("/posts/post/" + res.data._id);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="md:min-h-[80vh] px-8 md:px-[200px] mt-8 flex md:flex-row flex-col-reverse md:items-start items-start">
      {/* <div className="bg-white dark:bg-gray-900"> */}
        <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
          <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
            Add a new Post
          </h2>
          <form action="#">
            <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
              <div className="sm:col-span-2">
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Post Title
                </label>
                <input
                  onChange={(e) => setTitle(e.target.value)}
                  type="text"
                  placeholder="Enter post title"
                  name="name"
                  id="name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  required
                />
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Upload Image
                </label>
                <input
                  onChange={(e) => setFile(e.target.files[0])}
                  type="file"
                  className="bg-txt border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                />
              </div>

              <div>
                {/* <div className="flex flex-col"> */}
                <div className="sm:col-span-2">
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Category
                  </label>
                  <div className="flex">
                    <input
                      value={cat}
                      onChange={(e) => setCat(e.target.value)}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-l-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="Enter post category"
                      type="text"
                    />
                    <button
                      type="button"
                      onClick={addCategory}
                      className="bg-btn text-sm font-medium text-txt rounded-r-lg p-2.5 hover:bg-primary"
                    >
                      Add
                    </button>
                  </div>

                </div>
              </div>
              <div>
                <label
                  htmlFor="category"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Recommend Categories
                </label>
                <button
                  type="submit"
                  onClick={handleRecommendedCats}
                  className="bg-btn border border-gray-300 text-sm font-medium text-txt rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:text-txt dark:focus:ring-primary-500 dark:focus:border-primary-500 hover:bg-primary"
                >
                  Get Recommendations
                </button>
                {desc === "" && check ? (
                  <h3 className="text-red-500 text-sm text-center mt-4">
                    Add post description to get recommendations
                  </h3>
                ) : (
                  <div></div>
                )}
              </div>

              <div>
                <div className="flex px-4 mt-3">
                  {cats?.map((c, i) => (
                    <div
                      key={i}
                      className="flex justify-center items-center space-x-2 mr-4 text-txt bg-primary px-2 py-1 rounded-md border-2 border-btn"
                    >
                      <p>{c}</p>
                      <p
                        onClick={() => deleteCategory(i)}
                        className="text-txt bg-tertiary rounded-full cursor-pointer text-sm p-0.5"
                      >
                        <IoClose />
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="description"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Description
                </label>
                <textarea
                  onChange={(e) => setDesc(e.target.value)}
                  placeholder="Enter post description"
                  id="description"
                  rows="8"
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                ></textarea>
              </div>
            </div>
            <button
              type="submit"
              onClick={handleCreate}
              className="w-full px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-txt bg-btn rounded-lg hover:bg-primary"
            >
              Add Post
            </button>
          </form>
        </div>
      </div>

      
      <Footer />
    </div>
  );
};

export default CreatePost;
