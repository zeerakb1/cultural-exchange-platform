import { useNavigate, useParams } from "react-router-dom";
import Comment from "../components/Comment";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { BiEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import axios from "axios";
import { URL, IF } from "../url";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import Loader from "../components/Loader";
import { HfInference } from "@huggingface/inference";
const TOKEN_KEY = import.meta.env.VITE_SOME_KEY;

const hf = new HfInference(TOKEN_KEY);

const PostDetails = () => {
  const postId = useParams().id;
  const [post, setPost] = useState({});
  const { user } = useContext(UserContext);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const [loader, setLoader] = useState(false);
  const [audioSrc, setAudioSrc] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [selectedLanguage, setSelectedLanguage] = useState("English");
  // const original = post ? post.desc : "";
  const [converting, setConverting] = useState(false);
  const [text, setText] = useState("");

  const languageMapping = {
    Arabic: "ar_AR",
    Czech: "cs_CZ",
    German: "de_DE",
    English: "en_XX",
    Spanish: "es_XX",
    Estonian: "et_EE",
    Finnish: "fi_FI",
    French: "fr_XX",
    Gujarati: "gu_IN",
    Hindi: "hi_IN",
    Italian: "it_IT",
    Japanese: "ja_XX",
    Kazakh: "kk_KZ",
    Korean: "ko_KR",
    Lithuanian: "lt_LT",
    Latvian: "lv_LV",
    Burmese: "my_MM",
    Nepali: "ne_NP",
    Dutch: "nl_XX",
    Romanian: "ro_RO",
    Russian: "ru_RU",
    Sinhala: "si_LK",
    Turkish: "tr_TR",
    Vietnamese: "vi_VN",
    Chinese: "zh_CN",
    Afrikaans: "af_ZA",
    Azerbaijani: "az_AZ",
    Bengali: "bn_IN",
    Persian: "fa_IR",
    Hebrew: "he_IL",
    Croatian: "hr_HR",
    Indonesian: "id_ID",
    Georgian: "ka_GE",
    Khmer: "km_KH",
    Macedonian: "mk_MK",
    Malayalam: "ml_IN",
    Mongolian: "mn_MN",
    Marathi: "mr_IN",
    Polish: "pl_PL",
    Pashto: "ps_AF",
    Portuguese: "pt_XX",
    Swedish: "sv_SE",
    Swahili: "sw_KE",
    Tamil: "ta_IN",
    Telugu: "te_IN",
    Thai: "th_TH",
    Tagalog: "tl_XX",
    Ukrainian: "uk_UA",
    Urdu: "ur_PK",
    Xhosa: "xh_ZA",
    Galician: "gl_ES",
    Slovene: "sl_SI",
  };

  const fetchPost = async () => {
    setLoader(true);
    try {
      const res = await axios.get(URL + "/api/posts/" + postId);
      setPost(res.data);
      setText(res.data.desc);
      // setLoader(false);
    } catch (err) {
      console.log(err);
    }
    setLoader(false);
  };

  const handleLanguageChange = async (e) => {
    setConverting(true);
    if (e.target.value !== "English") {
      setSelectedLanguage(e.target.value);
      console.log(e.target.value, languageMapping[e.target.value]);
      const res = await hf.translation({
        model: "facebook/mbart-large-50-many-to-many-mmt",
        inputs: text,
        parameters: {
          src_lang: "en_XX",
          tgt_lang: languageMapping[e.target.value],
        },
      });
      setText(res.translation_text);
    } else {
      setSelectedLanguage(e.target.value);
      setText(post.desc);
    }
    setConverting(false);
  };

  const handleAudio = async () => {
    setIsLoading(true);
    const result = await hf.textToSpeech({
      model: "espnet/kan-bayashi_ljspeech_vits",
      inputs: post.desc,
    });

    const audioUrl = window.URL.createObjectURL(result);
    setAudioSrc(audioUrl);
    setIsLoading(false);
  };

  const handleDeletePost = async () => {
    try {
      const res = await axios.delete(URL + "/api/posts/" + postId, {
        withCredentials: true,
      });
      console.log(res.data);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchPost();
  }, [postId]);

  const fetchPostComments = async () => {
    setLoader(true);
    try {
      const res = await axios.get(URL + "/api/comments/post/" + postId);
      setComments(res.data);
      setLoader(false);
    } catch (err) {
      setLoader(true);
      console.log(err);
    }
  };

  useEffect(() => {
    fetchPostComments();
  }, [postId]);

  const postComment = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        URL + "/api/comments/create",
        {
          comment: comment,
          author: user.username,
          postId: postId,
          userId: user._id,
        },
        { withCredentials: true }
      );

      window.location.reload(true);
      // navigate('/posts/post/' + postId)
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Navbar />
      {loader ? (
        <div className="h-[80vh] flex justify-center items-center w-full">
          <Loader />
        </div>
      ) : (
        <div className="px-8 md:px-[200px] mt-8">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-black md:text-3xl">
              {post.title}
            </h1>
            {user?._id === post?.userId && (
              <div className="flex items-center justify-center space-x-2">
                <p
                  className="cursor-pointer"
                  onClick={() => navigate("/edit/" + postId)}
                >
                  <BiEdit />
                </p>
                <p className="cursor-pointer" onClick={handleDeletePost}>
                  <MdDelete />
                </p>
              </div>
            )}
          </div>
          <div className="flex items-center justify-between mt-2 md:mt-4">
            <p>@{post.username}</p>
            <div className="flex space-x-2">
              <p>{new Date(post.updatedAt).toString().slice(3, 15)}</p>
              <p>{new Date(post.updatedAt).toString().slice(16, 21)}</p>
            </div>
          </div>
          {!post.photo ? (
            <img
              src="https://t4.ftcdn.net/jpg/04/70/29/97/360_F_470299797_UD0eoVMMSUbHCcNJCdv2t8B2g1GVqYgs.jpg"
              className="w-full mx-auto mt-8"
              alt=""
            />
          ) : (
            <img
              src={IF + post.photo}
              className="w-full  mx-auto mt-8"
              alt=""
            />
          )}

          {/* <p className="mx-auto mt-8">{post.desc}</p> */}
          {!converting ? (
            selectedLanguage !== "English" ? (
              <div>
                {/* <h3>Text:</h3> */}
                <p className="mx-auto mt-8">{text}</p>
              </div>
            ) : (
              <div>
                {/* <h3>Text:</h3> */}
                <p className="mx-auto mt-8">{post.desc}</p>
              </div>
            )
          ) : (
            <div>
              <h3 className="mx-auto mt-8">Translating...</h3>
            </div>
          )}

          <div className="flex flex-wrap items-center mt-8 space-x-4 font-semibold">
            <p>Categories:</p>
            <div className="flex flex-wrap justify-start items-center space-x-2">
              {post.categories?.map((c, i) => (
                <>
                  <div key={i} className="bg-gray-300 rounded-lg px-3 py-1 mt-3 lg:mt-0">
                    {c}
                  </div>
                </>
              ))}
            </div>
            <div className="flex flex-wrap justify-end space-x-2">
              <label htmlFor="language-select">Choose a language:</label>
              <select
                id="language-select"
                value={selectedLanguage}
                onChange={handleLanguageChange}
              >
                {Object.entries(languageMapping).map(([language, code]) => (
                  <option key={code} value={language}>
                    {language}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex items-center mt-8 space-x-4 font-semibold">
            <button onClick={handleAudio} disabled={isLoading}>
              {isLoading ? "Generating Audio..." : "Listen to Audio"}
            </button>
            {isLoading ? (
              <div>{"  "}</div>
            ) : (
              audioSrc && (
                <audio controls src={audioSrc}>
                  Your browser does not support the audio element.
                </audio>
              )
            )}
          </div>

          <div className="flex flex-col mt-4">
            <h3 className="mt-6 mb-4 font-semibold">Comments:</h3>
            {comments?.map((c) => (
              <Comment key={c._id} c={c} post={post} />
            ))}
          </div>

          <div className="w-full flex flex-col mt-4 md:flex-row">
            <input
              onChange={(e) => setComment(e.target.value)}
              type="text"
              placeholder="Write a comment"
              className="md:w-[80%] outline-none py-2 px-4 mt-4 md:mt-0"
            />
            <button
              onClick={postComment}
              className="bg-black text-sm text-white px-2 py-2 md:w-[20%] mt-4 md:mt-0"
            >
              Add Comment
            </button>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default PostDetails;
