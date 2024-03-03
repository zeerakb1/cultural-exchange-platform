import { useNavigate, useParams } from "react-router-dom";
import Comment from "../components/Comment";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { BiEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import axios from "axios";
// import { URL } from "../url";
import { URL, IF } from "../url";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import Loader from "../components/Loader";

const PostDetails = () => {
  const postId = useParams().id;
  const [post, setPost] = useState({});
  const { user } = useContext(UserContext);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();

  const fetchPost = async () => {
    try {
      const res = await axios.get(URL + "/api/posts/" + postId);
      // console.log(res.data)
      setPost(res.data);
    } catch (err) {
      console.log(err);
    }
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
              <p>{new Date(post.updatedAt).toString().slice(0, 15)}</p>
              <p>{new Date(post.updatedAt).toString().slice(16, 24)}</p>
            </div>
          </div>
          {!post.photo ? (
            <img
              src="https://t4.ftcdn.net/jpg/04/70/29/97/360_F_470299797_UD0eoVMMSUbHCcNJCdv2t8B2g1GVqYgs.jpg"
              className="w-full mx-auto mt-8"
              alt=""
            />
          ) : (
            <img src={IF + post.photo} className="w-full  mx-auto mt-8" alt="" />
          )}
          
          <p className="mx-auto mt-8">{post.desc}</p>
          <div className="flex items-center mt-8 space-x-4 font-semibold">
            <p>Categories:</p>
            <div className="flex justify-center items-center space-x-2">
              {post.categories?.map((c, i) => (
                <>
                  <div key={i} className="bg-gray-300 rounded-lg px-3 py-1">
                    {c}
                  </div>
                </>
              ))}
            </div>
          </div>
          <div className="flex flex-col mt-4">
            <h3 className="mt-6 mb-4 font-semibold">Comments:</h3>
            {comments?.map((c) => (
              <Comment key={c._id} c={c} post={post} />
            ))}
          </div>
          {/* write a comment */}
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

// import Footer from "../components/Footer";
// import Navbar from "../components/Navbar";
// import { BiEdit } from "react-icons/bi";
// import { MdDelete } from "react-icons/md";
// import Comment from "../components/Comment";

// const PostDetails = () => {
//   return (
//     <div>
//       <Navbar />
//       <div className="px-8 md:px-[200px] mt-8">
//         <div className="flex justify-between items-center">
//           <h1 className="text-2xl font-bold text-black md:text-3xl">
//             Counter-Strike 2 on Steam
//           </h1>
//           <div className="flex items-center justify-center space-x-2">
//             <p className="cursor-pointer" onClick={() => {}}>
//               <BiEdit />
//             </p>
//             <p className="cursor-pointer" onClick={() => {}}>
//               <MdDelete />
//             </p>
//           </div>
//         </div>

//         <div className="flex items-center justify-between mt-2 md:mt-4">
//           <p>@username</p>
//           <div className="flex space-x-2">
//             <p>16/11/2023</p>
//             <p>11:46:03 pm</p>
//           </div>
//         </div>
//         <img
//           src="https://cdn.cloudflare.steamstatic.com/steam/apps/730/capsule_616x353.jpg?t=1698860631"
//           alt=""
//           className="w-full mx-auto mt-8"
//         />
//         <p className="mx-auto mt-8">
//           {" "}
//           For over two decades, Counter-Strike has offered an elite competitive
//           experience, one shaped by millions of players from across the globe.
//           And now the next chapter in the CS story is about to begin. This is
//           Counter-Strike 2. A free upgrade to CS:GO, Counter-Strike 2 marks the
//           largest technical leap in Counter-Strike’s history. Built on the
//           Source 2 engine, Counter-Strike 2 is modernized with realistic
//           physically-based rendering, state of the art networking, and upgraded
//           Community Workshop tools.
//         </p>
//         <div className="flex items-center mt-8 space-x-4 font-semibold">
//           <p>Categories:</p>
//           <div className="flex justify-center items-center space-x-2">
//             <div className="bg-gray-300 rounded-lg px-3 py-1">Tech</div>
//             <div className="bg-gray-300 rounded-lg px-3 py-1">Tech1</div>
//             <div className="bg-gray-300 rounded-lg px-3 py-1">Tech2</div>
//           </div>
//         </div>
//         <div className="flex flex-col mt-4">
//          <h3 className="mt-6 mb-4 font-semibold">Comments:</h3>
//          <Comment />
//          <Comment />
//          <Comment />
//          <Comment />
//          </div>
//          <div className="w-full flex flex-col mt-4 md:flex-row">
//           <input onChange={() => {}} type="text" placeholder="Write a comment" className="md:w-[80%] outline-none py-2 px-4 mt-4 md:mt-0"/>
//           <button onClick={() => {}} className="bg-black text-sm text-white px-2 py-2 md:w-[20%] mt-4 md:mt-0">Add Comment</button>
//          </div>

//       </div>
//       <Footer />
//     </div>
//   );
// };

// export default PostDetails;
