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
// import { HfInference } from "@huggingface/inference";
// import AudioPlayer from "../components/AudioPlayer";
import SpeechPlayer from "../components/SpeechPlayer";
// import DropDown from "../components/DropDown";
// const TOKEN_KEY = import.meta.env.VITE_SOME_KEY;
const TOKEN_KEY = import.meta.env.VITE_RAPID_API_KEY;

// const hf = new HfInference(TOKEN_KEY);

const PostDetails = () => {
  const postId = useParams().id;
  const [post, setPost] = useState({});
  const { user } = useContext(UserContext);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const [loader, setLoader] = useState(false);
  // const [audioSrc, setAudioSrc] = useState("");
  // const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const [isAudioReady, setIsAudioReady] = useState(false);
  // const original = post ? post.desc : "";
  const [converting, setConverting] = useState(false);
  const [text, setText] = useState("");
  const toggleAudioPlayer = () => {
    setIsAudioReady(!isAudioReady); // Toggle visibility of the TextToSpeechPlayer
  };


  const languages = {
    "af": { "name": "Afrikaans" },
    "am": { "name": "Amharic" },
    "ar": { "name": "Arabic" },
    "az": { "name": "Azerbaijani" },
    "bg": { "name": "Bulgarian" },
    "bn": { "name": "Bangla" },
    "bs": { "name": "Bosnian" },
    "ca": { "name": "Catalan" },
    "cs": { "name": "Czech" },
    "cy": { "name": "Welsh" },
    "da": { "name": "Danish" },
    "de": { "name": "German" },
    "el": { "name": "Greek" },
    "en": { "name": "English" },
    "es": { "name": "Spanish" },
    "et": { "name": "Estonian" },
    "fa": { "name": "Persian" },
    "fi": { "name": "Finnish" },
    "fr": { "name": "French" },
    "he": { "name": "Hebrew" },
    "hi": { "name": "Hindi" },
    "hr": { "name": "Croatian" },
    "hu": { "name": "Hungarian" },
    "hy": { "name": "Armenian" },
    "id": { "name": "Indonesian" },
    "is": { "name": "Icelandic" },
    "it": { "name": "Italian" },
    "ja": { "name": "Japanese" },
    "ka": { "name": "Georgian" },
    "kk": { "name": "Kazakh" },
    "km": { "name": "Khmer" },
    "kn": { "name": "Kannada" },
    "ko": { "name": "Korean" },
    "lt": { "name": "Lithuanian" },
    "lv": { "name": "Latvian" },
    "mk": { "name": "Macedonian" },
    "ml": { "name": "Malayalam" },
    "mn": { "name": "Mongolian" },
    "mr": { "name": "Marathi" },
    "ms": { "name": "Malay" },
    "my": { "name": "Burmese" },
    "ne": { "name": "Nepali" },
    "nl": { "name": "Dutch" },
    "no": { "name": "Norwegian" },
    "pa": { "name": "Punjabi" },
    "pl": { "name": "Polish" },
    "pt": { "name": "Portuguese" },
    "ro": { "name": "Romanian" },
    "ru": { "name": "Russian" },
    "sk": { "name": "Slovak" },
    "sl": { "name": "Slovenian" },
    "so": { "name": "Somali" },
    "sq": { "name": "Albanian" },
    "sv": { "name": "Swedish" },
    "sw": { "name": "Swahili" },
    "ta": { "name": "Tamil" },
    "te": { "name": "Telugu" },
    "th": { "name": "Thai" },
    "tr": { "name": "Turkish" },
    "uk": { "name": "Ukrainian" },
    "ur": { "name": "Urdu" },
    "vi": { "name": "Vietnamese" },
    "zh": { "name": "Chinese" }
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
    const langCode = e.target.value;
    if (langCode !== "en") {
      try {
        const options = {
          method: 'POST',
          url: 'https://microsoft-translator-text.p.rapidapi.com/translate',
          params: {
            to: selectedLanguage,
            'api-version': '3.0',
            profanityAction: 'NoAction',
            textType: 'plain'
          },
          headers: {
            'content-type': 'application/json',
            'x-rapidapi-key': TOKEN_KEY,
            'x-rapidapi-host': 'microsoft-translator-text.p.rapidapi.com'
          },
          data: JSON.stringify([{ "Text": post.desc }])
        };


        const res = await axios.request(options);
        // console.log(post.desc, res.data, res.data[0].translations[0].text, selectedLanguage)
        setText(res.data[0].translations[0].text);
      } catch (error) {
        console.error('Error during translation:', error);
        setText(post.desc); 
      }


    } else {
      setText(post.desc); 
    }
    setConverting(false);
    setSelectedLanguage(langCode);
  };

  // const handleAudio = async () => {
  //   setIsLoading(true);
  //   const result = await hf.textToSpeech({
  //     model: "espnet/kan-bayashi_ljspeech_vits",
  //     inputs: post.desc,
  //   });

  //   const audioUrl = window.URL.createObjectURL(result);
  //   setAudioSrc(audioUrl);
  //   setIsLoading(false);
  // };


  // const handleSynthesize = async () => {
  //   try {
  //     setIsLoading(true);
  //     // const response = await axios.post(URL + "/api/posts/synthesize", { text: post.desc }, { responseType: 'blob' });
  //     // const audioUrl = window.URL.createObjectURL(response.data);
  //     // console.log(response.data)
  //     const options = {
  //       method: 'POST',
  //       url: 'https://open-ai-text-to-speech1.p.rapidapi.com/',
  //       headers: {
  //         'x-rapidapi-key': '15dd1f83eamsh5f20f2884148690p159830jsn645b487f89e2', 
  //         'x-rapidapi-host': 'open-ai-text-to-speech1.p.rapidapi.com',
  //         'Content-Type': 'application/json'
  //       },
  //       data: {
  //         model: 'tts-1',
  //         input: post.desc,
  //         voice: 'alloy'
  //       },
  //       responseType: 'blob' // Setting the response type to 'blob' to handle binary data
  //     };
  //     const response = await axios.request(options);
  //     const audioUrl = window.URL.createObjectURL(response.data); 
  //     setAudioSrc(audioUrl);
  //     setIsLoading(false);
  //   } catch (error) {
  //     console.error('Error synthesizing text:', error);
  //   }
  // };




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

      setComments((prevComments) => [...prevComments, res.data]);

      // Clear the input field after posting the comment
      setComment("");
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteComment = async (id) => {
    try {
      await axios.delete(URL + "/api/comments/" + id, {
        withCredentials: true,
      });
      // window.location.reload(true);
      setComments(comments.filter(comment => comment._id !== id));
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
          <div className="flex items-center justify-between mt-2 md:mt-4 font-bold">
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
            selectedLanguage !== "en" ? (
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
            <div className="flex justify-center items-center mx-auto mt-8 space-x-2">
              <h4 className="font-bold text-lg">Translating</h4>
              <div className="relative">
                <div className="h-4 w-4 rounded-full border-t-2 border-b-2 border-tertiary"></div>
                <div className="absolute top-0 left-0 h-4 w-4 rounded-full border-t-2 border-b-2 border-primary animate-spin"></div>
              </div>
            </div>
          )}

          <div className="flex md:flex-wrap items-center mt-8 space-x-4 font-semibold md:justify-between">
            <div className="pl-0 p-3">
              {/* <p>Categories:</p> */}
              <div className="flex flex-wrap justify-start items-center space-x-2">
                <p>Categories:</p>
                {post.categories?.map((c, i) => (
                  <>
                    <div
                      key={i}
                      className="bg-tertiary text-txt rounded-lg px-3 py-1 mt-3 lg:mt-0"
                    >
                      {c}
                    </div>
                  </>
                ))}
              </div>
            </div>


            <div className="flex flex-wrap justify-end space-x-2">
              <label
                htmlFor="language-select"
                className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Choose a language:
              </label>

              <select id="language-select" value={selectedLanguage}
                onChange={handleLanguageChange}
                className="block text-xs sm:text-sm text-txt md:w-[70%] py-2 px-3 border border-gray-300 bg-btn rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:font-bold bor"
              >
                {Object.entries(languages).map(([key, value]) => (
                  <option key={key} value={key}>{value.name}</option>
                ))}
              </select>


              {/* <select
                id="language-select"
                value={selectedLanguage}
                onChange={handleLanguageChange}
                className="block text-xs sm:text-sm text-txt md:w-[70%] py-2 px-3 border border-gray-300 bg-btn rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:font-bold bor"
              >
                {Object.entries(languageMapping).map(([language, code]) => (
                  <option key={code} value={language}>
                    {language}
                  </option>
                ))}
              </select> */}


            </div>
          </div>


          {/* <div className="flex items-center mt-8 space-x-4 font-semibold">
            <button
              onClick={handleSynthesize}
              disabled={isLoading}
              className="inline-flex items-center justify-center px-4 py-2 bg-btn text-txt text-sm font-medium leading-6 rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 transition ease-in-out duration-150"
            >
              {isLoading ? "Generating Audio..." : "Listen to Audio"}
            </button>
            {isLoading ? (
              <div>{"  "}</div>
            ) : (
              audioSrc && (
                <div className="relative w-full">
                  <AudioPlayer src={audioSrc} />
                </div>
              )
            )}
          </div> */}

          <div className="flex items-center mt-8 space-x-4 font-semibold">
            <button
              onClick={toggleAudioPlayer}
              className="inline-flex items-center justify-center px-4 py-2 bg-btn text-txt text-sm font-medium leading-6 rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 transition ease-in-out duration-150"
            >
              {isAudioReady ? "Hide Audio Player" : "Listen to Audio"}
            </button>
            {isAudioReady && (
              <div className="relative w-full">
                <SpeechPlayer text={post.desc} />
              </div>
            )}
          </div>


          <div className="flex flex-col mt-4">
            <h3 className="mt-6 mb-4 font-semibold">Comments:</h3>
            {comments?.map((c) => (
              <Comment key={c._id} c={c} deleteComment={deleteComment} />
            ))}
          </div>

          <div className="w-full flex flex-col mt-4 md:flex-row">
            <input
              onChange={(e) => setComment(e.target.value)}
              type="text"
              placeholder="Write a comment"
              className="md:w-[80%] rounded-lg outline-none py-2 px-4 mt-4 md:mt-0 md:mr-4"
            />
            <button
              onClick={postComment}
              className="bg-btn text-sm text-txt rounded-lg px-2 py-2 md:w-[20%] mt-4 md:mt-0"
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
